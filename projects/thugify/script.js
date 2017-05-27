document.getElementById('go').onclick = function() {
    var inputText = $('text-input').val();
    var racistText = inputText + ", racism";
    $('output').innerHTML = racistText;
}