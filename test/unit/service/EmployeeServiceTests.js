var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;
const EmployeeService = require('../../../app/service/EmployeeService');
const employee = {
    employeeId: 1,
    salary: "30000",
    fname: "Mocha",
    lname: "Chai",
    email: "test@email.com",
    address: "address",
    address2: "address2",
    city: "city",
    county: "county",
    postalCode: "postalCode",
    country: "country",
    phoneNo: "01234567890",
    bankNo: "12345678",
    nin: "nin"
}

describe('EmployeeService', function () {
    describe('getEmployees', function () {
      it('should return employees from response', async () => {
        var mock = new MockAdapter(axios);

        const data = [employee];

        mock.onGet(EmployeeService.URL).reply(200, data);

        var results = await EmployeeService.getEmployees();

        expect(results[0]).to.deep.equal(employee)
      })

      it('should throw exception when 500 error returned from axios', async () => {
        var mock = new MockAdapter(axios);

        mock.onGet(EmployeeService.URL).reply(500);

        var error = await EmployeeService.getEmployees()
        
        expect(error.message).to.equal('Could not get employees')
      })

  })
  describe('getEmployee', function () {
    /*
    Mocking Exercise 1

    Write a unit test for the getEmployee method

    When axios returns with a 500 error

    Expect a "Failed to get employee" error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should throw exception when 500 error returned from axios', async () => {
      var mock = new MockAdapter(axios);

      mock.onGet(EmployeeService.URL).reply(500)

      var error = await EmployeeService.getEmployee(1)
      
      expect(error.message).to.equal('Failed to get employee')
    })

    /*
    Mocking Exercise 2

    Write a unit test for the getEmployee method

    When axios returns an employee

    Expect the employee to be returned

    This should pass without code changes
     */

    it('should return employee when get employee method is called', async () => {
      var id = 1;

      var mock = new MockAdapter(axios);

      mock.onGet('/hr/employee/' + id).reply(200, employee)

      var response = await EmployeeService.getEmployee(id)
      
      expect(response.employeeId).to.equal(id)
    })

    /*
    Mocking Exercise 3

    Write a unit test for the getEmployee method

    When the id parameter is null

    Expect the dao not to be called

    This should fail, make code changes to make this test pass
     */

    it('should not call dao when id parameter is null', async () => {
      var id = null;

      var mock = new MockAdapter(axios);

      var error = await EmployeeService.getEmployee(id)
      
      expect(error.message).to.equal('Employee ID cannot be null')
    })

    /*
    Mocking Exercise 4

    Write a unit test for the getEmployee method

    When axios returns with a 400 error

    Expect a "User does not exist" error to be returned

    This should fail, make code changes to make this test pass
     */

    it('User Does Not Exist error should be returned if axios returns a 400 error', async () => {
      var id = 1;

      var mock = new MockAdapter(axios);

      mock.onGet('/hr/employee/' + id).reply(400)

      var error = await EmployeeService.getEmployee(id)
      
      expect(error.message).to.equal('User does not exist')
    })

  })
  describe('createEmployee', function () {

    /*
    Mocking Exercise 5

    Write a unit test for the createEmployee method

    When the axios returns an id

    Expect the id to be returned

    This should pass without code changes
     */

    it('createEmployee should return an employee id when axios returns an employee id', async () => {
      var id = 1;

      var mock = new MockAdapter(axios);

      mock.onPost(EmployeeService.URL).reply(200, {employeeId: id})

      var response = await EmployeeService.createEmployee(employee)
      
      expect(response.employeeId).to.equal(1)
    })

    /*
    Mocking Exercise 6

    Write a unit test for the createEmployee method

    When axios returns with a 400 error

    Expect a "Invalid data" error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should return Invalid Data when axios returns 400 error', async () => {
      var id = 1;

      var mock = new MockAdapter(axios);

      mock.onPost(EmployeeService.URL).reply(400)

      var error = await EmployeeService.createEmployee(employee)
      
      expect(error.message).to.equal('Invalid data')
    })

     /*
    Mocking Exercise 7

    Write a unit test for the createEmployee method

    When axios returns with a 500 error

    Expect a "Could not create employee" error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should return Could not create employee when axios returns 500 error', async () => {
      var id = 1;

      var mock = new MockAdapter(axios);

      mock.onPost(EmployeeService.URL).reply(500)

      var error = await EmployeeService.createEmployee(employee)
      
      expect(error.message).to.equal('Could not create employee')
    })
    })
  })