"use strict";
const certificateSettingsList = JSON.parse(fs.readFileSync("./data_source/certificates.json", "utf8"));
console.log(certificateSettingsList);
const { settings } = certificateSettingsList.find(({ certificate_type }) => certificate_type == this.certificateType);
this.certificateSettings = settings;
return this;
