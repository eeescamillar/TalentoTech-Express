const HouseSchema = require("../models/House");

async function generationRandomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newCode = '';

  for (let i = 0; i < 4; i++) {
    newCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  for (let i = 0; i < 4; i++) {
    newCode += Math.floor(Math.random() * 10);
  }
  try {
    const uniqueCode = await HouseSchema.findOne({ code: newCode });

    if (uniqueCode) {
      return generationRandomCode();
    } else {
      return newCode
    }
  } catch (error) {
    console.log(error)
  }

}

function generateZipCodes() {
  let newZipCode = '';

  for (let i = 0; i < 6; i++) {
    newZipCode += Math.floor(Math.random() * 10);
  }
  return newZipCode;
}


module.exports = { generateZipCodes, generationRandomCode }
