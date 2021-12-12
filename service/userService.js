define([''], function () {

    //Login and Signup
    var methods = {};
    methods.ajaxPost = function (url,obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            //xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
            xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }
    
    methods.ajaxPost1= function (url,obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
          // xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }

    methods.ajaxPostcolorUpdateNote= function (url,obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
           xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }

    methods.ajaxPostCollab= function (url,obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
           xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }

    methods.archive= function (url,obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
           xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }


    methods.trashNote= function (url,obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
           xhr.setRequestHeader("Content-type", "application/json");

            xhr.onerror = reject;

            xhr.send(obj)

        });
    }

    methods.colorNotes = async function (obj4) {
        let colorResponse = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes', obj4, config)
        return colorResponse;
      }


      methods.collabNotes = async function (obj5) {
        let collabResponse = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList', obj5, config)
        return collabResponse;
      }
    //GET
    methods.ajaxGet = function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                    console.log(xhr.response, xhr.responseXML);
                    resolve(xhr.response)
                }
            };
            xhr.open('GET', url, true);
            xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
           // xhr.setRequestHeader("Content-type", "multipart/form-data");

            xhr.onerror = reject;

            xhr.send()

        });
    }

    return methods;

})