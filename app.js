const { response } = require('express');
const express = require ('express')

app.get('/', (req, res) => {
    res.send("Test 1")
})

app.listen(3000, () => {
    console.log("IT'S RUNNING");
})