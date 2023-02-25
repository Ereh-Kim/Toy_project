
  $('#menubtn').click(
    ()=>{
      $('#border2').hide()
      $('#unactivate_border2').attr('id','activate_border2')
      $('.line').attr('class','activate_line')

      $('#activate_menubtn').click(()=>{
      $('#border2').show()
      $('#activate_border2').attr('id','unactivate_border2')
      $('.activate_line').attr('class','line')
    })

    })

  $('#closebtn').click(
      ()=>{
        $('#closebtn').hide()
        $('#btn2').hide()
        $('.apply').hide()
        $('#unactivate_filter_title').attr('id','activate_filter_title')
        $('#unactivate_openbtn').attr('id','activate_openbtn')
    
        $('#activate_openbtn').click(()=>{
        $('#activate_openbtn').attr('id','unactivate_openbtn')
        $('#activate_filter_title').attr('id','unactivate_filter_title')
        $('#closebtn').show()
        $('#btn2').show()
        $('.apply').show()
    })
      })

    $('.version_close_btn').click(()=>{
      
      $('.select_doc').hide()
      $('.select').hide()
      $('.version_close_btn').hide()
      $('#version_selector').attr('id','version_selector_closed')
      $('#version_selector_title').attr('id','version_selector_title_activate')
      $('.version_open_btn_unactivate').attr('class','version_open_btn')

      $('.version_open_btn').click(()=>{
      $('.select_doc').show()
      $('.select').show()
      $('.version_close_btn').show()
      $('#version_selector_closed').attr('id','version_selector')
      $('#version_selector_title_activate').attr('id','version_selector_title')
      $('.version_open_btn').attr('class','version_open_btn_unactivate')
      })      

    })

