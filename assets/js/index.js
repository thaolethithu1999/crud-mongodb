$("#add_user").submit((event) => {
  alert("Data inserted");
});

$("#update_user").submit((event) => {
  event.preventDefault();

  var unindexed_array = $("#update_user").serializeArray();
  var data = {};

  $.map(unindexed_array, (n, i) => {
    data[n["name"]] = n["value"];
  });

  let request = {
    url: `http://localhost:3000/api/users/${data.id}`,
    method: "PUT",
    data: data,
  };

  $.ajax(request).done((response) => {
    alert("Data Updated Successfully!");
  });
});

if (window.location.pathname == "/") {
  $ondelete = $(".delete");
  $ondelete.click(() => {
    var id = $(this).attr("data-id");
    console.log(id);

    var request = {
      url: `http://localhost:3000/api/users/${id}`,
      method: "DELETE",
    };
    console.log(request);

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done((response) => {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}
