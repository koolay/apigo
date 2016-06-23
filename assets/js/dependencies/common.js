var ui = {

    alert: function(type, title, msg) {
        if (type == 'success') {
            $elem = $('.ui.success.message');
        } else if(type == 'fail') {
            $elem = $('.ui.negative.message');
        } else if (type == 'confirm') {
            $elem = $('.ui.modal.confirm');
        } else {
            console.log('undefined type');
        }
        $titleElem = $elem.find('.alert-title');
        $contentElem = $elem.find('.alert-content');
        if ($titleElem) {
            $titleElem.text(title);
        }
        if ($contentElem) {
            $contentElem.text(msg);
        }
        $elem.show();
    }
};


