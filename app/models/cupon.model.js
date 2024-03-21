module.exports = (sequelize, DataTypes) => {
    const Cupon = sequelize.define("cupon", {
        code: {
            type: DataTypes.STRING,
        },
        descuento: {
            type: DataTypes.INTEGER,
        },
        valido: {
            type: DataTypes.DATE,
        },
        state: {
            type: DataTypes.STRING,
        },
    });
    return Cupon;
};