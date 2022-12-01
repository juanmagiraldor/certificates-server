import * as fs from "fs";

class Certificate {
  constructor({ certificateType, name, stellarAccount, certificateDate }) {
    this.certificateType = certificateType;
    this.name = name;
    this.stellarAccount = stellarAccount;
    this.certificateDate = certificateDate;
    this.certificateConfig = {};
    this.certificateObj = {};
  }

  loadCertificateConfig() {
    var obj = JSON.parse(
      fs.readFileSync("./data_source/certificates.json", "utf8")
    );

    const certificateConfig = obj.find(
      ({ certificate_type }) => certificate_type == this.certificateType
    );

    this.certificateConfig = certificateConfig.config;

    return this;
  }

  addCreateAt() {
    this.createAt = new Date().toISOString().split("T")[0];

    return this;
  }

  addCertificateId() {
    const ids = this.certificateConfig.certificate_ids;

    this.certificateObj.certicateId =
      ids[Math.floor(Math.random() * ids.length)];

    return this;
  }

  addCertificateTexts() {
    const textConfig = this.certificateConfig.texts;
    this.certificateObj.texts = [];
    textConfig.forEach((text) => {
      text.text = `${text.textFormatter}${this.getTextFrom(text.type)}`;
      this.certificateObj.texts.push(text);
    });
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

  addMeshConfig() {
    this.certificateObj.model_config = this.certificateConfig.model_config;

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
}

export default Certificate;
