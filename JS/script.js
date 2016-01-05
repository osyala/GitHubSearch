console.log('hi')
window.onload = function(){
    console.log('Loading JS')


    var urlProfile = "https://api.github.com/users/"
    var apiKey = "?access_token=9ebae670d27b5028644ce5e039aa4eb867075530"
    // remember to remove 'osyala' after you get the search working

    console.log('JS still running')


    // var ajaxParams = {
        // console.log('running')

        // url:"https://api.github.com/users/osyala"
        // data:{
        //     api_key:'771a301cfa3bcbf4b606dce5b437f55103a7d172'
        // }
    

    // var deferredObj = $.ajax(ajaxParams)

// Ajax
    var doAjaxPRepo = function(query){
        console.log(query)
        // console.log('stopped')
        var ajaxProfile = {
            url: urlProfile + query.slice(1) + apiKey,
            // success: headerInfo,
            success: profileInfoList

        }

        location.hash = query



        $.ajax(ajaxProfile)

        var ajaxRepo = {
            url: urlProfile + query.slice(1) + '/repos' + apiKey,
            success: liRepos
        }

        $.ajax(ajaxRepo)
    }    

    var doAjaxProfile = function(){
        var q = inputKeyEvent()
        var akParams = '?access_token=9ebae670d27b5028644ce5e039aa4eb867075530'
        var urlProfile = "https://api.github.com/users/" + q + akParams
        console.log(urlProfile)
        $.ajax(ajaxProfile)       
    }


    var successFunction = function(responseData){
       console.log(responseData) 
       headerInfo(responseData)
       profileInfoList(responseData)
    }


    var ajaxProfile = {
        url: urlProfile,
        success: successFunction
    }



    var profileInfoList = function(GhObj){
        console.log('Running')
        var pInfo = $('#pInfo')[0];

        pInfo.innerHTML = "<img src" + GhObj.avatar_url + ">"
                        + "<li>" + GhObj.name + "</li>"
                        + "<li>" + GhObj.login + "</li>"
                        + "<li>" + GhObj.email + "</li>"
                        + "<li>" + GhObj.location + "</li>"
                        + "<li>" + GhObj.blog + "</li>"


    }

    var headerInfo = function(headMeta){

        var headInfo = $('h1')[0];
        headInfo.innerHTML = 'Pulled up' + headMeta.name + ' ' + '(' + headMeta.login + ')'

    }

    var liRepos = function(repoArray){
        var listEl = $('#repos')[0]
        listEl.innerHTML = ''
        repoArray.forEach(function(object){
            listEl.innerHTML += '<a href=' + object.html_url + '>' + object.name + "</a>"
        })
    }


    // var promise = $.ajax({url: urlProfile, success: successFunction })


    // BELOW will see if there is a change in the hash, if so run the function
    

    window.onhashchange = function(){
        var query = location.hash
        console.log('hash ' + query)
        doAjaxPRepo(query)
    }

    var inputEl = $('input')[0]


    var inputKeyEvent = function(event){
        if(event.keyCode === 13){
            var query = inputEl.value
            inputEl.value = ''
            console.log('input ' + query)
            location.hash = query
        }
    }


    inputEl.onkeypress = inputKeyEvent


}