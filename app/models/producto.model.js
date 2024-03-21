module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define("producto", {
        name: {
            type: DataTypes.STRING,
        },
        core: {
            type: DataTypes.STRING,
        },
        categoria: {
            type: DataTypes.STRING,
        },
        cant_star: {
            type: DataTypes.INTEGER,
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