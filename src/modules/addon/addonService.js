const Addon = require("./addonModel");

// 전체 추가 상품 불러오기
const getAllAddons = async  () =>{
    const addons = await Addon.findAll();
    const addonsList = addons.map(addon => ({
        id: addon.dataValues.id,
        add_on_name: addon.dataValues.add_on_name,
        price: addon.dataValues.price
    }));

    return addonsList;
}

module.exports = {
    getAllAddons,
};