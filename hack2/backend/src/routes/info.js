// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    const priceFiltering = (restaurant) => {
        let found = false
        priceFilter.map((price) => {
            if (restaurant.price == price) {
                found = true
            }
        })
        return found;
    }
    const mealFiltering = (restaurant) => {
        let found = false;
        mealFilter.map((meal) => {
           restaurant.tag.map(tag => {
                if(tag === meal){
                    found = true
                }
           });
        })
        return found;
    }
    const typeFiltering = (restaurant) => {
       let found = false
        typeFilter.map((type) => {
           restaurant.tag.map(tag => {
                if(tag === type){
                    found = true
                }
           });
        })
        return found;
    }


    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 

    const Sort = (data) => {
        if(sortBy === 'price'){
            data.sort(function (store1, store2) {
                return store1.price - store2.price
              })
        }else{
            data.sort(function (store1, store2) {
                return store1.distance - store2.distance
        })}
          
        return data
    }

    // TODO Part I-3-a: find the information to all restaurants
    Info.find({}).exec((err, data) => {
        //console.log(priceFilter);
        if (priceFilter) {
            const newdata = data.filter((restaurant)=> priceFiltering(restaurant))
            data = newdata
        }
        if (mealFilter) {
            const newdata = data.filter((restaurant)=> mealFiltering(restaurant))
            data = newdata
        }
        if(typeFilter){
            const newdata = data.filter((restaurant)=> typeFiltering(restaurant))
            data = newdata
        }

        if (err) {
            res.status(403).send({ message: 'error', contents: [] })
        }
        else {
            const sortData = Sort(data);
            res.status(200).send({ message: 'success', contents: sortData }) 
        }
    })
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests

    Info.findOne({id: id}).exec((err, data) => {
        if(err) {
            res.status(403).send({ message: 'error', contents: [] })
        }
        else {
            res.status(200).send({ message: 'success', contents: data })
        }
    })
}