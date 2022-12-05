"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Certificate {
    constructor({ certificateType, name, stellarAccount, certificateDate }) {
        this.certificateType = certificateType;
        this.name = name;
        this.stellarAccount = stellarAccount;
        this.certificateDate = certificateDate;
        this.certificateSettings = {};
        this.certificateSettingsExport = {};
    }
    loadCertificateSettings() {
        const certificateSettingsList = JSON.parse(fs.readFileSync("./data_source/certificates.json", "utf8"));
        const { settings } = certificateSettingsList.find(({ certificate_type }) => certificate_type == this.certificateType);
        this.certificateSettings = settings;
        return this;
    }
    addCreateAt() {
        this.createAt = new Date().toISOString().split("T")[0];
        return this;
    }
    addBlenderModelAndObject() {
        const blenderModelIds = this.certificateSettings.certificate_ids;
        const blenderModelId = blenderModelIds[Math.floor(Math.random() * blenderModelIds.length)];
        this.certificateSettingsExport.material_file = blenderModelId + ".mtl";
        this.certificateSettingsExport.object_file = blenderModelId + ".obj";
        return this;
    }
    addCertificateTexts() {
        const textSettings = this.certificateSettings.texts;
        textSettings.forEach((textSetting) => {
            textSetting.text = `${textSetting.textFormatter}${this.getTextFrom(textSetting.type)}`;
        });
        this.certificateSettingsExport.texts = textSettings;
        return this;
    }
    getTextFrom(property) {
        if (property == "username") {
            return this.name;
        }
        if (property == "stellar_account") {
            return this.stellarAccount;
        }
        if (property == "certificate_date") {
            return this.certificateDate;
        }
    }
    addMeshSettings() {
        this.certificateSettingsExport.model_settings =
            this.certificateSettings.model_settings;
        return this;
    }
    addQr() {
        return this;
    }
    createIPFS() {
        return this;
    }
    createStellar() {
        return this;
    }
    createJSONFile() {
        const settingsObj = JSON.stringify(this.certificateSettingsExport, null, 2);
        try {
            fs.writeFileSync(`${this.stellarAccount}.json`, settingsObj, "utf-8");
        }
        catch (error) {
            console.error(error);
        }
        return this;
    }
}
exports.default = Certificate;
