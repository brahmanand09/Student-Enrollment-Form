/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdpIML = "/api/iml";
var studentDBName = "Student Enrollment";
var studentRelationName = "Stu-Rel";
var token = "90932307|-31949271032877561|90954162";

$("#rollNo").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getrollNoAsJsonObj() {
    var rollNo = $("#rollNo").val();
    var jsonStr = {
        id: rollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#studentName").val(data.name);
    $("#studentClass").val(data.class);
    $("#birthDate").val(data.birthDate);
    $("#address").val(data.address);
    $("#enrollmentDate").val(data.enrollmentDate);
}

function resetForm() {
    $("#rollNo").val("");
    $("#studentName").val("");
    $("#studentClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#rollNo").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollNo").focus();
}

function validatedata() {
    var rollNo, studentName, studentClass, birthDate, address, enrollmentDate;
    rollNo = $("#rollNo").val();
    studentName = $("#studentName").val();
    studentClass = $("#studentClass").val();
    birthDate = $("#birthDate").val();
    address = $("#address").val();
    enrollmentDate = $("#enrollmentDate").val();

    if (rollNo === "") {
        alert("Roll No Required Value");
        $("#rollNo").focus();
        return "";
    }
    if (studentName === "") {
        alert("Student Name is Required Value");
        $("#studentName").focus();
        return "";
    }
    if (studentClass === "") {
        alert("Class is Required Value");
        $("#studentClass").focus();
        return "";
    }
    if (birthDate === "") {
        alert("Birth-Date is Required Value");
        $("#birthDate").focus();
        return "";
    }
    if (address === "") {
        alert("Address is Required Value");
        $("#address").focus();
        return "";
    }
    if (enrollmentDate === "") {
        alert("Enrollment Date is Required Value");
        $("#enrollmentDate").focus();
        return "";
    }
    var jsonStrObj = {
        id: rollNo,
        name: studentName,
        class: studentClass,
        birthDate: birthDate,
        address: address,
        enrollmentDate: enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
}

function getStudent() {
    var rollNoJsonObj = getrollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(token, studentDBName, studentRelationName, rollNoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studentName").focus();

    } else if (resJsonObj.status === 200) {

        $("#rollNo").prop("disabled", true);
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#studentName").focus();
    }
}

function saveData() {
    var jsonStrObj = validatedata();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(token, jsonStrObj, studentDBName, studentRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdpIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollNo").focus();
}

function updateData() {
    $("#update").prop("disabled", true);
    jsonUpd = validatedata();
    var updateRequest = createUPDATERecordRequest(token, jsonUpd, studentDBName, studentRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdpIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollNo").focus();
}


