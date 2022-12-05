import Certificate from "./certificate";

const certificate = {
  certificateType: "mentor-1000h",
  name: "Samuel Rosero",
  stellarAccount: "GA7WNQWLP5DTFUTE53URQCTQCI24L4NUCJ4YRALHU6DHKSDTLXWXGYUG",
  certificateDate: "2022-10-11",
};

new Certificate(certificate)
  .loadCertificateSettings()
  .addCreateAt()
  .addBlenderModelAndObject()
  .addCertificateTexts()
  .addMeshSettings()
  .addQr()
  .createIPFS()
  .createStellar()
  .createJSONFile();
