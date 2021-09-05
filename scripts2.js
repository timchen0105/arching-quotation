var section_id = ["wood", "painting", "electric", "cabinet", "floor", "glass", "clean"];
var cnt = [0, 0, 0, 0, 0, 0, 0];
var subtotal = [[0], [0], [0], [0], [0], [0], [0]];
var section_total = [0, 0, 0, 0, 0, 0, 0];
var untaxed_total = 0;
var tax = 0;
var total = 0;

function find_section_index(section){
    for(var i = 0; i < section_id.length; i++){
        if(section === section_id[i]){
            return i;
        }
    }
}

function find_index(id){
    var index = 0;
    var flag = false;
    for(var i = 0; i < id.length; i++){
        if(id[i] === '_' && flag === false){
            flag = true;
        }
        if(id[i] === '_' && flag === true){
            i++;
            index = parseInt(id[i]);
            for(var j = i + 1; j < id.length; j++){
                index *= 10;
                index += parseInt(id[j]);
            }
        }
    }
    return index;
}

function create_new(section){
    var container = document.getElementById(section+'_container');
    var element = document.getElementById(section+'_div');
    var new_element = document.createElement('div');
    new_element = element.cloneNode(true);
    var section_index = find_section_index(section);
    console.log(section_index);
    cnt[section_index]++;
    subtotal[section_index].push(0);
    var index = cnt[section_index];
    new_element.id = section+'_div_'+index;
    new_element.childNodes[1].id = section+'_select_'+index;
    new_element.childNodes[3].id = section+'_num_'+index;
    new_element.childNodes[5].childNodes[1].childNodes[1].id = section+'_subtotal_'+index;
    new_element.style.display = 'inline-block';
    container.appendChild(new_element);
}

function add(section, obj){
    var parent_id = obj.parentElement.id;
    var index = find_index(parent_id);
    var price = document.getElementById(section + "_select_" + index).value;
    var num = document.getElementById(section + "_num_" + index).value;
    var temp_subtotal = price*num;
    var section_index = find_section_index(section);
    section_total[section_index] += temp_subtotal;
    console.log(index);
    console.log(section_index);
    section_total[section_index] -= subtotal[section_index][index];
    untaxed_total += temp_subtotal;
    untaxed_total -= subtotal[section_index][index];
    document.getElementById(section + "_subtotal_" + index).innerHTML = temp_subtotal;
    document.getElementById(section + "_total").innerHTML = section_total[section_index];
    document.getElementById("untaxed_total").innerHTML = untaxed_total;
    document.getElementById("untaxed_total_2").innerHTML = untaxed_total;
    document.getElementById("untaxed_total_3").innerHTML = untaxed_total;
    add_tax();
    document.getElementById("total").innerHTML = total;
    // document.getElementById("total_2").innerHTML = total;
    subtotal[section_index][index] = temp_subtotal;
}

function remove(section, obj){
    var remove_element = obj.parentElement;
    var index = find_index(remove_element.id);
    var section_index = find_section_index(section);
    section_total[section_index] -= subtotal[section_index][index];
    untaxed_total -= subtotal[section_index][index];
    document.getElementById(section + "_total").innerHTML = section_total[section_index];
    document.getElementById("untaxed_total").innerHTML = untaxed_total;
    document.getElementById("untaxed_total_2").innerHTML = untaxed_total;
    document.getElementById("untaxed_total_3").innerHTML = untaxed_total;
    add_tax();
    document.getElementById("total").innerHTML = total;
    // document.getElementById("total_2").innerHTML = total;
    remove_element.remove();
}

function add_tax(){
    var tax_rate = document.getElementById("tax_rate").value * 0.01;
    tax = untaxed_total * tax_rate;
    total = untaxed_total + tax;
    document.getElementById("tax").innerHTML = tax;
    document.getElementById("total").innerHTML = total;
    // document.getElementById("total_2").innerHTML = total;
}