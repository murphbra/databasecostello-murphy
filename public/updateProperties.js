  
function updateProperties(propertyID){
    $.ajax({
        url: '/propertiesUpdate/' + propertyID,
        type: 'PUT',
        data: $('#propertiesUpdate').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};