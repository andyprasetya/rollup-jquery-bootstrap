import templates from './ui-template';
import helpers from './helpers';

var menu = {};

var $ = jQuery;

menu._activateTopNav = function() {
  $('#navbarSupportedContent > ul.navbar-nav > li.nav-item > a.nav-link').on('click', function(evt){
    evt.stopImmediatePropagation();
    $('#navbarSupportedContent.navbar-collapse.collapse.show').removeClass().addClass('navbar-collapse collapse');
    let itemid = $(this).attr('id');
    switch(itemid) {
      case 'home':

        break;
      case 'data':

        break;
      case 'peta':

        break;
      case 'login':
        let loginBoxDOM = templates.loginBox();
        let cmdButtonsDOM = templates.loginButtons();
        document.getElementById('form_modal_label').innerHTML = "<i class='fa fa-lock'></i>&nbsp;Login SIG SATPOL PP";
        document.getElementById('form_modal_body').innerHTML = loginBoxDOM;
        document.getElementById('form_modal_footer').innerHTML = cmdButtonsDOM;
        $('#modalform').modal({'show':true, 'backdrop':'static'});
        $('#modalform').on('shown.bs.modal', function() {
          var formLogin = document.getElementById('dynamicform');
          formLogin.onsubmit = function(e){
            var iun = document.getElementById('username').value,
              ipw = document.getElementById('password').value;
            if (iun.length < 3 || ipw.length < 3) {
              document.getElementById('notice').innerHTML = "<div class='alert alert-danger pl-0 pr-0 text-center' role='alert'>Username/password Anda salah.</div>";
              setTimeout(function(){
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                document.getElementById('notice').innerHTML = "<div class='alert alert-secondary pl-0 pr-0 text-center' role='alert'>Masukkan username dan password Anda.</div>";
                document.getElementById('username').focus();
              },1500);
            } else {
              var form = document.querySelector('#dynamicform'),
                formData = helpers.serialize(form), 
                jsonData = helpers.QueryStringToJSON(decodeURIComponent(formData));
              fetch('../dataservices/doLogin', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
              })
              .then(function(response){
                return response.json();
              })
              .then(function(data){
                if (data.response=="201") {
                  document.getElementById('notice').innerHTML = "<div class='alert alert-success pl-0 pr-0 text-center' role='alert'>Login berhasil. Memuat aplikasi...</div>";
                  sessionStorage.setItem('codex', data.codex);
                  sessionStorage.setItem('module', data.module);
                  sessionStorage.setItem('userid', data.userid);
                  sessionStorage.setItem('username', data.usernm);
                  sessionStorage.setItem('realname', data.userrn);
                  setTimeout(function(){
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    document.location = "../app/";
                  },2000);
                } else {
                  document.getElementById('notice').innerHTML = "<div class='alert alert-danger pl-0 pr-0 text-center' role='alert'>Login gagal. Ulangi login Anda.</div>";
                  setTimeout(function(){
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('notice').innerHTML = "<div class='alert alert-secondary pl-0 pr-0 text-center' role='alert'>Masukkan username dan password Anda.</div>";
                    document.getElementById('username').focus();
                  },1500);
                }
              })
              .catch(function(err){
                console.log(err);
              });
            }
            return false;
          }
        });
        $('#modalform').on('hidden.bs.modal', function() {
          document.getElementById('form_modal_label').innerHTML = "";
          document.getElementById('form_modal_body').innerHTML = "";
          document.getElementById('form_modal_footer').innerHTML = "";
        });
        break;
      default:
        console.log('undefined');
        break;
    }
    return false;
  });
}

export default menu;