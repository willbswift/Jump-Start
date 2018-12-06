module.exports = function (sequelize, DataTypes) {
    const Quiz = sequelize.define("quiz", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            field: 'id',
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        typeId: {
            type: DataTypes.INTEGER
        },
        question: {
            type: DataTypes.STRING
        },
        choices: {
            type: DataTypes.STRING
        },
        answer: {
            type: DataTypes.STRING
        },
        nextId: {
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
    return Quiz;
};
