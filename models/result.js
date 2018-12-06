module.exports = function (sequelize, DataTypes) {
    const Result = sequelize.define("result", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            field: 'id',
        },
        userId: {
            type: DataTypes.INTEGER
        },
        quizId: {
            type: DataTypes.INTEGER
        },
        userAnswer: {
            type: DataTypes.STRING,
        },
        score: {
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
    return Result;
};
