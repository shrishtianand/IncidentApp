enum statusCodes  {
    success = 200,
    created = 201,
    error = 400, //bad request
    unAuthorized = 401, //unauthorized
    forbidden = 403, //access denied
    notFound = 404 //Not Found
};

let messages = {
    requiredFields: 'Please send required fields',
};

let empMessages = {
    empCreatedSuccessfully: 'Employee created successfully',
    empDeletedSuccessfully: 'Employee deleted successfully',
    empEmpIDRequired:'Employee ID is required',
    empSaveError: 'Error while saving employee',
    empDeleteError: 'Error while deleting employee',
    empCreateError: 'Error while creating employee',
    empFNameRequired: 'first name is required',
    empLNameRequired: 'last name name is required',
    empEmailIDRequired: 'email id is required',
    empDepartmentRequired: 'department is required',
    empClientRequired: 'client is required',
    empProjectRequired: 'project is required',
    empManagerIDRequired: 'Manager ID is required',
    empNotFound: 'employee not found',
    getAllEmpsErr: 'Error while getting all employees',
}

let incMessages = {
    incCreatedSuccessfully: 'Incident created successfully',
    incSaveError: 'Error while saving incident',
    incCreateError: 'Error while creating incident',
    incCUpdateError: 'Error while updating incident',
    incOwnerRequired: 'Owner is required',
    incCreatedByRequired: 'CreatedBy is required',
    incDescRequired: 'Description is required',
    incIncidentIDRequired: 'Incident ID is required',
    incReportTimeStampRequired: 'ReportDateTimeis required',
    incIncidentIDNull: 'Incident ID is null'
}


let defaultMessages = {
    create: ' created successfully',
    createerr: ' creation error ',
    getallerr: "'(s) getting all data error",
    getsingleerr: ' getting error',
    saveerr: ' saving error',
    getall: '(s) list',
    save: ' saved successfully',
    getsingle: ' details'
}

let csvColumns = ['firstName', 'lastName','emailID','department','client','project','managerID'];

type  returnObject = {
    status: number,
    message: string,
    data: Array<any>,
};

export {
    statusCodes,
    messages,
    empMessages,
    incMessages,
    defaultMessages,
    csvColumns,
    returnObject

}