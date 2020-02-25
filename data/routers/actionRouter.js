const express = require('express');
const Actions = require('../helpers/actionModel.js');
const Projects = require('../helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was an error retrieving data from the server.'});
    });
});

router.get('/:id', validateActionId, (req,res) => {
    
});

router.post('/', validateAction, (req,res) => {
  Actions.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: 'There was a server error when adding your project.'});
    });
});




router.put('/:id', validateAction, (req,res) => {
    const { id } = req.params;

    Actions.update(id, req.body)
        .then(response => {
            if (response === null) {
                res.status(400).json({message: 'No action exist for the provided ID.'});
            } else {
                res.status(200).json(response);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'There was a server error when updating your action.'});
        });
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;

    Actions.remove(id)
        .then(response => {
            res.status(200).json({message: `${response} records were successfully removed.`});
        })
        .catch(error => {
            console.log(error);
            res.s;tatus(500).json({error: 'There was an error responding to your delete request'});
        })
    
});





// custom middleware

function validateActionId(req, res, next) {
    const { id } = req.params;

    //get the projects - since we can't get by id
    Actions.get()
        .then(results => {
            function checkId(action) {
                return action.id == id
            };
            
            const pool = results.filter(checkId);
            
            if (pool.length == 0) {
                res.status(400).json({error: 'Action with provided ID was not found.'});
            } else {
                res.status(200).json(pool[0]);
            };

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'There was an error retrieving data from the server.'})
        });
};

function validateAction(req, res, next) {
  function isEmpty(obj) {
    for(let key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    } 
      return true;
  };

  if(isEmpty(req.body)) {
    res.status(400).json({ error: "Missing required data." });
  } else {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      res.status(400).json({ error: "Missing required text field." });
    } else if (req.body.description.length > 128 ) {
        res.status(400).json({ error: "Description cannot exceed 128 characters." });
    } else {
      next();
    }
  };
};


module.exports = router;