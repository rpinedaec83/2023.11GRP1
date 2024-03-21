module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define("producto", {
        name: {
            type: DataTypes.STRING,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        precio: {
            type: DataTypes.STRING,
        },
        urlPhoto: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
    });
    return Producto;
};