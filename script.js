function loadfromurl() {
  var data = "";
  fetch("http://www.cartrawler.com/ctabe/cars.json")
    .then(function (response) {
      data = response;
      return response.json();
    })
    .then(function (data) {
      let list = data[0].VehAvailRSCore.VehVendorAvails,
        rentalDetails = data[0].VehAvailRSCore.VehRentalCore;
      generateLegend(rentalDetails);
      generateTable(list);
    });
}
loadfromurl();

function generateLegend(data) {
  let legendDiv = document.getElementById("rental");
  legend =
    '<td scope="col">' +
    data["@PickUpDateTime"] +
    '</td><td scope="col">' +
    data.PickUpLocation["@Name"] +
    '</td><td scope="col">' +
    data["@ReturnDateTime"] +
    '</td><td scope="col">' +
    data.ReturnLocation["@Name"] +
    "</td>";
  legendDiv.insertAdjacentHTML("afterEnd", legend);
}
var listArray = [];

function loadTable() {

  let tableBody = document.getElementById("myData"),
    list = "",
    details = "";
  let available = listArray;
  for (var j = 0; j < available.length; ++j) {
    details =
      "<ul>" +
      "<li>Air Condition: " +
      available[j].AirConditionInd +
      "</li><li>Baggage Quantity: " +
      available[j].BaggageQuantity +
      "</li><li>Code: " +
      available[j].Code +
      "</li><li>Code Context: " +
      available[j].CodeContext +
      "</li><li>Door Count: " +
      available[j].DoorCount +
      "</li><li>DriveType: " +
      available[j].DriveType +
      "</li><li>Fuel Type: " +
      available[j].FuelType +
      "</li><li>Passenger Quantity: " +
      available[j].PassengerQuantity +
      "</li><li>Transmission Type: " +
      available[j].TransmissionType +
      "</li></ul>";



    price = available[j].EstimatedTotalAmount + available[j].CurrencyCode;

    list +=
      '<tr><td scope="col">' +
      available[j].vendorName +
      '</td><td scope="col">' +
      available[j].Status +
      '</td><td scope="col">' +
      available[j].VehMakeModel +
      '</td><td scope="col">' +
      details +
      '</td ></td><td scope="col">' +
      price +
      '</td ><td scope="col"> <img src="' + available[j].PictureURL + '"  width="300px" /></td >' +
      '<td scope="col"> <a class="btn btn-warning" onclick="navToNewPage(' + j + ')" >View Details</a></td ></tr >';

  }
  $("#myData").html(list);
}

function navToNewPage(j) {
  var sm = JSON.stringify(listArray[j]);
  sessionStorage.newppage = sm;
  window.location.href = "carinfo.html";

}




function generateTable(data) {
  for (var i = 0; i < data.length; ++i) {
    let available = data[i].VehAvails;
    for (var j = 0; j < available.length; ++j) {
      var json = {};
      json.vendorName = data[i].Vendor["@Name"];
      json.AirConditionInd = available[j].Vehicle["@AirConditionInd"];
      json.BaggageQuantity = available[j].Vehicle["@BaggageQuantity"];
      json.Code = available[j].Vehicle["@Code"];
      json.CodeContext = available[j].Vehicle["@CodeContext"];
      json.DoorCount = available[j].Vehicle["@DoorCount"];
      json.DriveType = available[j].Vehicle["@DriveType"];
      json.FuelType = available[j].Vehicle["@FuelType"];
      json.PassengerQuantity = available[j].Vehicle["@PassengerQuantity"];
      json.TransmissionType = available[j].Vehicle["@TransmissionType"];
      json.Status = available[j]["@Status"];
      json.EstimatedTotalAmount = parseFloat(available[j].TotalCharge["@EstimatedTotalAmount"]);
      json.CurrencyCode = available[j].TotalCharge["@CurrencyCode"];
      json.VehMakeModel = available[j].Vehicle.VehMakeModel["@Name"];
      json.PictureURL = available[j].Vehicle["PictureURL"];
      listArray.push(json);
    }
  }
  sort('EstimatedTotalAmount');
  loadTable();

}

function btnSort(type) {
  sort(type);
  loadTable();

}

function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}

function sort(type) {
  listArray.sort(sortByProperty(type));
}
