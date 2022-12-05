"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const certificate_1 = __importDefault(require("./certificate"));
const certificate = {
    certificateType: "mentor-1000h",
    name: "Samuel Rosero",
    stellarAccount: "GA7WNQWLP5DTFUTE53URQCTQCI24L4NUCJ4YRALHU6DHKSDTLXWXGYUG",
    certificateDate: "2022-10-11",
};
new certificate_1.default(certificate)
    .loadCertificateSettings()
    .addCreateAt()
    .addBlenderModelAndObject()
    .addCertificateTexts()
    .addMeshSettings()
    .addQr()
    .createIPFS()
    .createStellar()
    .createJSONFile();
