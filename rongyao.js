$(document).ready(function () {

    var storage = window.localStorage;
    var obj = [];

    var elem = $('.heros-collect .heros-column');

    $(".heroPic").on("change", function () {
        var fFile = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(fFile);
        reader.onload = function () {
            var objSon = new Object();
            objSon.name = $(".heroName").val();
            objSon.vocation = $(".heroVocation").val();
            objSon.skill = $(".heroSkill").val();
            objSon.src = this.result;
            var tobjSon = [objSon];
            // var oostring = JSON.stringify(obj);

            if (storage.getItem("tar") == null) {
                obj = obj.concat(tobjSon);
                var stringHeros = JSON.stringify(obj);
                storage.setItem("tar", stringHeros);
            } else {

                var getHeros = storage.getItem("tar");
                obj = JSON.parse(getHeros);
                obj = obj.concat(tobjSon);
                var stringHeros = JSON.stringify(obj);
                storage.setItem("tar", stringHeros);
            }
            window.location.reload();
        }
    })

    var heroObj = storage.getItem("tar");
    var heroObject = JSON.parse(heroObj);
    // console.log(heroObject);

    elem.empty();
    $.each(heroObject, function (key, val) {
        // console.log(key);
        // console.log(val.name);
        // console.log(val.src);
        var li = $("<li class = \"col-sm-2\"></li>")
        elem.append(li);
        var img = $("<img>");
        img.attr({ "alt": val.name, "src": val.src, "title": key });
        li.append(img)
    })

    // 修改英雄属性
    $("#revise").click(function () {
        var heroId = $(".obtainId").val();

        var getHeros = storage.getItem("tar");
        obj = JSON.parse(getHeros);
        obj[heroId].name = $(".reviseName").val();
        obj[heroId].vocation = $(".reviseVocation").val();
        obj[heroId].skill = $(".reviseSkill").val();
        var setHeros = JSON.stringify(obj);
        storage.setItem("tar", setHeros);
        window.location.reload();
    })


    // 删除英雄
    $(".removeName").click(function () {
        var sn = $(".serachName").val();
        var getHeros = storage.getItem("tar");
        obj = JSON.parse(getHeros);
        $.each(obj, function (key, value) {
            if (sn == value.name) {
                $(".revealRemoveName").html(value.name);
                $(".revealRemoveVocation").html(value.vocation);
                $(".revealRemoveSkill").html(value.skill);
                $(".revealRemovePic").attr({ "src": value.src, "title": key });
            }

        })
    })
    // 点击删除英雄
    $(".removeTheHero ").click(function () {
        var sn = $(".serachName").val();
        var getHeros = storage.getItem("tar");
        obj = JSON.parse(getHeros);
        $.each(obj, function (key, value) {
            // alert(key);
            if (sn == value.name) {
                obj.splice(key, 1);
                var strObj = JSON.stringify(obj);
                storage.setItem("tar", strObj);
                window.location.reload();
            }
        })
    })

    // 查找英雄
    $(".describeHero").click(function () {
        var ls = $(".letSerach").val();
        var getHeros = storage.getItem("tar");
        obj = JSON.parse(getHeros);
        $.each(obj, function (key, value) {
            if (ls == value.name) {
                $(".revealName").html(value.name);
                $(".revealVocation").html(value.vocation);
                $(".revealSkill").html(value.skill);
                $(".revealPic").attr({ "src": value.src, "title": key });
                
            }

        })
        $(".otot").css("display","block");
        $(".background_color").css("display","block");
    })

    $(".viewClose").click(function () {
        $(".otot").css("display","none");
        $(".background_color").css("display","none");
        window.location.reload();
    })
});