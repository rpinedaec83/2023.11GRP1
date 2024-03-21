module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("cart", {
        item_id: { //id del producto
            type: DataTypes.INTEGER,
        },
        user_id: {  // id del usuario
            type: DataTypes.INTEGER,
        },
        cupon_id: { //id del cupon
            type: DataTypes.INTEGER,
        },
        cant: {     //cantidad
            type: DataTypes.INTEGER,
        },
        price: {    //precio
            type: DataTypes.INTEGER,
        },
        state: {    //estado
            type: DataTypes.STRING,
        },
    });
    return Cart;
};