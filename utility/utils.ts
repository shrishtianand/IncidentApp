import { appDataSource } from "../database/database"
async function createData(model: any,data: any){
    try {
        const createData = await appDataSource.getRepository(model).create(data)
        return createData;
    } catch (error) {
        return "error"
    }
}

async function getAllData(model: any,data: any){
    try {
        const createData = await appDataSource.getRepository(model).find(data)
        return createData;
    } catch (error) {
        return "error"
    }
}

async function getbyIDData(model: any,data: any){
    try {
        const createData = await appDataSource.getRepository(model).findOneBy(data)
        return createData;
    } catch (error) {
        return "error"
    }
}

async function saveData(model: any,data: any){
    try {
        const saveData = await appDataSource.getRepository(model).save(data)
        console.log(saveData);
        return saveData;
    } catch (error) {
        console.log("Error while saving = " + error)
        return "error"
    }
}

async function deleteData(model: any,data: any){
    try {
        const deleteData = await appDataSource.getRepository(model).delete(data)
        return deleteData;
    } catch (error) {
        return "error"
    }
}

export {
    createData,
    getAllData,
    getbyIDData,
    saveData,
    deleteData
}