module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            field: 'id',
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        phone: {
            type: DataTypes.STRING
        },
        picture: {
            type: DataTypes.STRING
        },
        permissionId: {
            type: DataTypes.INTEGER
        },
        departmentId: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
        {
            timestamps: true,
        });

    return User;
};
