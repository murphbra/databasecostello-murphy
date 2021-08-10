  
function updateProperties(propertyID){
    console.log("getting to updateprop");
    $.ajax({
        url: '/propertiesUpdate/' + propertyID,
        type: 'PUT',
        data: $('#propertiesUpdate').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};