"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTypeHelper = void 0;
const imageTypeHelper = (file) => {
    const fileType = file.mimetype;
    if (fileType.includes("jpeg") || fileType.includes("jpg")) {
        return "jpg";
    }
    else if (fileType.includes("png")) {
        return "png";
    }
    else if (fileType.includes("jpg")) {
        return "jpg";
    }
    else if (fileType.includes("gif")) {
        return "gif";
    }
    else if (fileType.includes("svg")) {
        return "svg";
    }
    else if (fileType.includes("webp")) {
        return "webp";
    }
    else {
        return;
    }
};
exports.imageTypeHelper = imageTypeHelper;
//# sourceMappingURL=imageHelpers.js.map