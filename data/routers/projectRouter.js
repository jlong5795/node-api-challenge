const express = require('express');
const Projects = require('../helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was an error retrieving data from the server.'});
    });
});

router.get('/:id', validateProjectId, (req,res) => {
    
});

router.post('/', validateProject, (req,res) => {
    Projects.insert(req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'There was a server error when adding your project.'});
        });
});

router.put('/:id', validateProject, (req,res) => {
    const { id } = req.params;

    Projects.update(id, req.body)
        .then(response => {
            if (response === null) {
                res.status(400).json({message: 'No projects exist for the provided ID.'});
            } else {
                res.status(200).json(response);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'There was a server error when updating your project.'});
        });
});

router.delete('/:id', validateProjectId, (req,res) => {
    const { id } = req.params;

    Projects.remove(id)
        .then(response => {
            res.status(200).json({message: `${response} records were successfully removed.`});
        })
        .catch(error => {
            console.log(error);
            res.s;tatus(500).json({error: 'There was an error responding to your delete request'});
        })
    
});

// custom middleware

function validateProjectId(req, res, next) {
    const { id } = req.params;

    //get the projects - since we can't get by id
    Projects.get()
        .then(results => {
            function checkId(project) {
                return project.id == id
            };
            
            const pool = results.filter(checkId);
            console.log(pool);

            if (pool.length == 0) {
                res.status(400).json({error: 'Project with provided ID was not found.'});
            } else {
                res.status(200).json(pool[0]);
            };

        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: 'There was an error retrieving data from the server.'})
        });
};

function validateProject(req, res, next) {
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
    if (!req.body.name || !req.body.description) {
      res.status(400).json({ error: "Missing required text field." });
    } else if (req.body) {
        next();
    }
  };
};

module.exports = router;