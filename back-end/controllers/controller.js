const fs = require('fs');
const csv = require('csv-parser');
let {validationResult } = require("express-validator");

module.exports = {
    getData: (req,res) => {
        let response = {
            message: "Something went wrong!",
            status: 401,
            data: {},
          };
          try {
            const data = [];
            fs.createReadStream('data.csv')
            .pipe(csv())
            .on('data', (row) => {
              data.push(row);
            })
            .on('end', () => {
                console.log(data);
                response.message = 'Data Fetched Successfully!'
                response.status = 'ok'
                response.data = data;
              
                res.json(response);
              
            });
          } catch (error) {
            console.log(error);
            response.message = "Something went wrong!,please try again later"
            return res.json(response);
          }
    },
    createData : (req,res) => {
        let response = {
            message: "Something went wrong!",
            status: 401,
            data: {},
          };
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              console.log(errors);
              response.message =
                errors.errors[0].path +
                " " +
                (errors.errors[0].msg == "Invalid value"
                  ? "is invalid, please check the value!"
                  : errors.errors[0].msg);
              return res.status(200).json(response);
            }

            let newData = req.body;
            const values = Object.values(newData);
            newData = values.join(',');

            const data = fs.readFileSync('data.csv', 'utf8');
            fs.writeFileSync('data.csv', data + '\n'  + newData);
            
            response.message = 'Record created successfully'
            response.status = 'ok'

            return res.status(200).json(response);

          } catch (error) {
            console.log(error);
            response.message = "Something went wrong upload failed!,please try again later"
            return res.json(response);
          }
    },
    updateData : (req,res) => {
      let response = {
        message: "Something went wrong!",
        status: 401,
        data: {},
      };
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          response.message =
            errors.errors[0].path +
            " " +
            (errors.errors[0].msg == "Invalid value"
              ? "is invalid, please check the value!"
              : errors.errors[0].msg);
          return res.status(200).json(response);
        }
         
        const idToUpdate = req.params.id;
        const updatedData = req.body;

        const data = fs.readFileSync('data.csv', 'utf8');
        const rows = data.split('\n');
        let updated = false;
      
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i].split(',');
          if (row[0] === idToUpdate) {
            rows[i] = `${idToUpdate},${updatedData.name},${updatedData.email},${updatedData.phone},${updatedData.city}`;
            updated = true;
            break;
          }
        }
      
        if (updated) {
          fs.writeFileSync('data.csv', rows.join('\n'));
          response.message = 'Record updated successfully';
        } else {
          response.message ='Record not found';
        }
        response.status = 'ok'
        return res.status(200).json(response);
      

      } catch (error) {
        console.log(error);
        response.message = "Something went wrong update failed!,please try again later"
        return res.json(response);
      }
    },
    deleteData : (req,res) => {
      let response = {
        message: "Something went wrong!",
        status: 401,
        data: {},
      };
      try {
        const idToDelete = req.params.id;

  // Read the CSV file, find and remove the corresponding record
  const data = fs.readFileSync('data.csv', 'utf8');
  const rows = data.split('\n');
  let deleted = false;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(',');
    if (row[0] === idToDelete) {
      rows.splice(i, 1);
      deleted = true;
      break;
    }
  }

  if (deleted) {
    fs.writeFileSync('data.csv', rows.join('\n'));
    response.message = 'Record deleted successfully' 
  } else {
    response.message = 'Record not found'
  }    
      response.status = 'ok'
       res.status(200).json(response)
      } catch (error) {
        console.log(error);
        response.message = "Something went wrong update failed!,please try again later"
        return res.json(response);
      }
    }
}