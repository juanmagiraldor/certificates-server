import * as fs from "fs";

interface CertificateRaw {
  certificateType: string;
  name: string;
  stellarAccount: string;
  certificateDate: string;
  certificateSettings?: object;
  certificateSettingsExport?: object;
}

class Certificate {
  certificateType:string;
  name:string;
  stellarAccount:string;
  certificateDate:string;
  certificateSettings:object;
  certificateSettingsExport:object;

  constructor({ certificateType, name, stellarAccount, certificateDate }: CertificateRaw) {
    this.certificateType = certificateType;
    this.name = name;
    this.stellarAccount = stellarAccount;
    this.certificateDate = certificateDate;
    this.certificateSettings = {};
    this.certificateSettingsExport = {};
  }

  loadCertificateSettings() {
    const certificateSettingsList:Object = JSON.parse(
      fs.readFileSync("./data_source/certificates.json", "utf8")
    );

    const { settings } = certificateSettingsList.find(
      ({ certificate_type }) => certificate_type == this.certificateType
    );

    this.certificateSettings = settings;

    return this;
  }

  addCreateAt() {
    this.createAt = new Date().toISOString().split("T")[0];

    return this;
  }

  addBlenderModelAndObject() {
    const blenderModelIds = this.certificateSettings.certificate_ids;

    const blenderModelId =
      blenderModelIds[Math.floor(Math.random() * blenderModelIds.length)];

    this.certificateSettingsExport.material_file = blenderModelId + ".mtl";
    this.certificateSettingsExport.object_file = blenderModelId + ".obj";

    return this;
  }

  addCertificateTexts() {
    const textSettings = this.certificateSettings.texts;

    textSettings.forEach((textSetting) => {
      textSetting.text = `${textSetting.textFormatter}${this.getTextFrom(
        textSetting.type
      )}`;
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
    } catch (error) {
      console.error(error);
    }

    return this;
  }
}

export default Certificate;
