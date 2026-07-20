export const rollbackTransaction = async (transaction) => {
    if (!transaction || transaction.finished) {
        return;
    }

    try {
        await transaction.rollback();
    } catch (rollbackError) {
        console.error("Unable to roll back transaction:", rollbackError);
    }
};

