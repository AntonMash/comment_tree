$(document).ready(function () {
    $(".reply").on('click', function () {
        var parentId = $(this).attr('data-id')
        $("#form-" + parentId).fadeToggle();
    });
    $(".submit-reply").on('click', function (e) {
        e.preventDefault();
        var parentId = $(this).attr('data-submit-reply')
        var id = $(this).attr('data-id')
        var text = $("#form-" + id).find('textarea[name="comment-text"]').val();
    })

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');

    data={
        user:"{{request.user.username}}",
        parentId:parentId,
        text:text,
        id:id,
        csrfmiddlewaretoken:csrftoken
    }
    $.ajax({
        method:"POST",
        data:data,
        url:"{%url 'comment_child_create' %}",
        success:function (data) {
            window.location.replace('/post-comments')

        }
    })
})