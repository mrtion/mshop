;(function(){
  layui.use(['form','jquery'], function(){
  	var form = layui.form();
    var $ = layui.jquery;
    form.on('submit(demo1)', function(data){
	    layer.alert(JSON.stringify(data))
	  });
    $('.js_btn').click(function(){
      var _this = $(this);
      var id = _this.data('id');
      $.ajax({
        url:'/admin/nodeList',
        type: 'post',
        dataType: 'json',
        data:{node_ids: [id]}
      }).done(function(d){
        if(d.code == 1){
          layer.msg('成功');
          _this.parents('tr').fadeOut();
        }
      })
    })
  });
})()
