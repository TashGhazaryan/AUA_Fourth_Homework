
$(function () {
    const remove = function () {
        $('.deleteBtn').on('click',function () {
            $.ajax({
                url     : "/todos/" + this.id,
                type    : 'DELETE',
                success : function(data) {
                    printList();
                    //location.reload();
                },
                error   : function(data) {
                    alert('Error deleting the item');
                }
            });
        })
    };

    const  upd = function () {
      $('.box').change(function () {
          let id = this.id.substr(3);
              $.ajax({
                  url     : "/todos/" + id,
                  type    : 'PUT',
                  success : function(data) {
                      printList();
                      //location.reload();
                  },
                  error   : function(data) {
                      alert('Error updating the item');
                  }
              });
      })
    };

    const printList = function () {
        $.ajax({
            type:'GET',
            url:'./todos',
            dataType:'json',
            success:function (data) {
                $('#list1').html('') ;
                data.forEach(function (element) {
                    const li = $('<li class="list-group-item list" style="font-size:30px;"><h1>'+element.message+'</h1><input type="checkbox" class="checkbox"><button>Delete</button></li>');
                    const del = li.find('button');
                    const box = li.find('input');
                    box.prop('class','box');
                    box.prop('id','box'+element.id);
                    del.prop('class', 'deleteBtn btn btn-lg btn-danger');
                    del.prop('id', element.id);
                    if (element.completed === true) {
                        box.prop('checked',true)
                    } else {
                        box.prop('checked',false)
                    }
                    $('#list1').append(li);

                });
                remove(); // function that allows to select the deleteBtn class
                upd();//function that allows to select the box class
            }
        });
    };


    printList();







    $('#addBtn').on('click',function () {
        $.ajax({
            type:'POST',
            url:'/todos',
            dataType:'json',
            data:JSON.stringify ({
                message:$('#add').val(),
                completed:false
            }),
            success:function (data) {
                console.log(data);
                //location.reload();
                printList();
            }
        });
    });
    $('#searchBtn').on('click',function () {
        $.ajax({
            type:'POST',
            url:'/search',
            dataType:'json',
            data: JSON.stringify({
                searchtext:$('#searchtxtbx').val()
            }),
            success:function (data) {
                $('#list1').html('') ;
                data.forEach(function (element) {
                    const li = $('<li class="list-group-item list" style="font-size:30px;"><h1>'+element.message+'</h1><input type="checkbox" class="checkbox"><button>Delete</button></li>');
                    const del = li.find('button');
                    const box = li.find('input');
                    box.prop('class','box');
                    box.prop('id','box'+element.id);
                    del.prop('class', 'deleteBtn btn btn-lg btn-danger');
                    del.prop('id', element.id);
                    if (element.completed === true) {
                        box.prop('checked',true)
                    } else {
                        box.prop('checked',false)
                    }
                    $('#list1').append(li);
                });
                remove();
                upd();
            }
        });
    });



});
