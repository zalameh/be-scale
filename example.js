function sum(a, b) {
  return a + b;
}

async function checkMaterials(productId) {
  try {
    const materials = await Material.find({ productId: productId, startTime: null });
    if (materials.length === 0) {
      console.log("No materials found with specified productId and null startTime");
      return null; // no materials found, return null
    } else {
      console.log(materials);
      return materials; // materials found, return them
    }
  } catch (err) {
    console.error(err);
    throw new Error("Error while checking materials");
  }
}

