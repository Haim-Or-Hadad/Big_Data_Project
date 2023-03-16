const express = require('express')
var cors = require('cors');
const BigML = require('bigml-node');
const bigml = require('bigml');
const pandas = require('pandas-js');



////////////////////bigML//////////////////////
const BIGML_USERNAME = 'haimor1123';
const BIGML_API_KEY = 'c3bb7048d9838e550affc1ea0b47b25e2d69f9f6';
const sourceFilePath = './data/dataset.csv';


// // create a new BigML client
const bigmlClient = new BigML(BIGML_USERNAME, BIGML_API_KEY);
var connection = new bigml.BigML('haimor1123','c3bb7048d9838e550affc1ea0b47b25e2d69f9f6') 

const BigMLfunction = ((req,res)=>{
    const source = new bigml.Source(connection);
      source.create(sourceFilePath, { name: 'My data source' }, true,function (error, sourceInfo) {
        if (!error && sourceInfo) {
          const dataset = new bigml.Dataset(connection);
          dataset.create(sourceInfo, null, true, function (error, datasetInfo) {
          if (!error && datasetInfo) {
            if (!error && datasetInfo) {
            const association = new bigml.Association(connection);
            association.create(datasetInfo, { name: 'ilan' }, true, function (error, associationInfo) {
             if (!error && associationInfo) {
               const model = new bigml.Model(connection);
               const results = {};        // save the result to export to json file
               results.data = [];
               model.get(associationInfo.resource, true, 'only_model=true;limit=-1', function (error, modelInfo) {
              if (!error && modelInfo) {
                for (let i = 0; i < modelInfo.object.associations.rules.length; i++) {
                  var src = modelInfo.object.associations.rules[i].lhs_cover[1]
                  var dest = modelInfo.object.associations.rules[i].rhs_cover[1]
                  console.log(src,  dest )
                  var antecedent = modelInfo.object.associations.items.find((item) => item.count === src).name
                  var consequent = modelInfo.object.associations.items.find((item) => item.count === dest).name
                  var coverage = (modelInfo.object.associations.rules[i].lhs_cover[0] * 100) + '%'
                  var support = (modelInfo.object.associations.rules[i].support[0] * 100) + '%'
                    results.data.push({
                      product: antecedent,
                      items: consequent,
                      support: support,
                      coverage: coverage
                    });
                }
                    //   res(JSON.stringify(results));
                        console.log(results)
                    }
     });
      }
       });
         }
          }
           })
              }
                });
              })
              BigMLfunction();

