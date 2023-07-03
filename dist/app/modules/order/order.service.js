"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const createOrderService = (orderData, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    //checking given buyer id is correct
    if (orderData.buyer !== user._id) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This is not your id");
    }
    //cheking available cow with cow id
    const avalibaleCow = yield cow_model_1.Cow.findById(orderData.cow);
    if (!avalibaleCow || avalibaleCow.label === "sold out") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "This cow is not found or sold out.");
    }
    // checking user is buyer
    const isBuyer = yield user_model_1.User.findById(orderData.buyer);
    if (isBuyer && isBuyer.budget <= avalibaleCow.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You need more money to byt this cow.");
    }
    let newOrderData = null;
    try {
        session.startTransaction();
        yield cow_model_1.Cow.updateOne({ _id: orderData.cow }, { $set: { label: "sold out" } }, { session });
        yield user_model_1.User.updateOne({ _id: orderData.buyer }, { $inc: { budget: -avalibaleCow.price } }, { session });
        yield user_model_1.User.updateOne({ _id: avalibaleCow.seller }, { $inc: { income: avalibaleCow.price } }, { session });
        const newOrder = yield order_model_1.Order.create([orderData], { session });
        if (!newOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Faild to create order.");
        }
        newOrderData = newOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newOrderData;
});
const getAllOrderService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let findData = {};
    if (user.role === "buyer") {
        findData = { buyer: user._id };
    }
    else if (user.role === "seller") {
        console.log("seller");
        const result = yield order_model_1.Order.find(findData).populate({
            path: "cow",
            match: { seller: user._id },
        });
        console.log(result);
        const filteredOrders = result.filter((order) => order.cow !== null);
        return filteredOrders;
    }
    else if (user.role === "admin") {
        findData = {};
    }
    const result = yield order_model_1.Order.find(findData).populate("cow");
    return result;
});
const getSingleOrderService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let findData = null;
    if (user.role === "buyer") {
        findData = { buyer: user._id };
    }
    else if (user.role === "seller") {
        console.log("seller");
        const result = yield order_model_1.Order.findOne({
            _id: id,
        })
            .populate({
            path: "cow",
            match: { seller: user._id },
            populate: {
                path: "seller",
            },
        })
            .populate("buyer");
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "There is no order in this id.");
        }
        return result;
    }
    else if (user.role === "admin") {
        findData = null;
    }
    const result = yield order_model_1.Order.findOne({ _id: id, findData })
        .populate({
        path: "cow",
        populate: {
            path: "seller",
        },
    })
        .populate("buyer");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "There is no order in this id.");
    }
    return result;
});
exports.OrderService = {
    createOrderService,
    getAllOrderService,
    getSingleOrderService,
};
