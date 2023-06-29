"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFilterableFields = exports.cowSearchableFields = exports.category = exports.label = exports.breed = exports.location = void 0;
exports.location = [
    "Chattogram",
    "Dhaka",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Comilla",
    "Rangpur",
    "Mymensingh",
];
exports.breed = [
    "Brahman",
    "Nellore",
    "Sahiwal",
    "Gir",
    "Indigenous",
    "Tharparkar",
    "Kankrej",
];
exports.label = ["for sale", "sold out"];
exports.category = ["Dairy", "Beef", "DualPurpose"];
exports.cowSearchableFields = ["name", "category", "location", "breed"];
exports.cowFilterableFields = [
    "searchTerm",
    "location",
    "breed",
    "price",
    "category",
    "minPrice",
    "maxPrice",
];
