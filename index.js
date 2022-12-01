import Certificate from "./certificate.js";

const certificate = {
  certificateType: "mentor-1000h",
  name: "Samuel Rosero",
  stellarAccount: "GA7WNQWLP5DTFUTE53URQCTQCI24L4NUCJ4YRALHU6DHKSDTLXWXGYUG",
  certificateDate: "2022-10-11",
};

const cert = new Certificate(certificate)
  .loadCertificateConfig()
  .addCreateAt()
  .addCertificateId()
  .addCertificateTexts()
  .addMeshConfig()
  .addQr()
  .createIPFS()
  .createStellar();

console.log(cert);
