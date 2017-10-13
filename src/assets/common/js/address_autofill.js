            $(function () {
                
                if($('.zip-change').val != ''){
                    var $this = $('.zip-change');
                    if ($this.val().length == 5) {
                        getAddressInfoByZip($this.val());
                    }
                }
                
                $('.zip-change').on('blur keyup', function () {
                    var $this = $(this);
                    if ($this.val().length == 5) {
                        getAddressInfoByZip($this.val());
                    }
                });
            });

            function getAddressInfoByZip(zip) {
                if (zip.length >= 5 && typeof google != 'undefined') {
                    var addr = {};
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'address': zip}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results.length >= 1) {
                                for (var ii = 0; ii < results[0].address_components.length; ii++) {
                                    var street_number = route = street = city = state = zipcode = country = formatted_address = '';
                                    var types = results[0].address_components[ii].types.join(",");
                                    if (types == "street_number") {
                                        addr.street_number = results[0].address_components[ii].long_name;
                                    }
                                    if (types == "route" || types == "point_of_interest,establishment") {
                                        addr.route = results[0].address_components[ii].long_name;
                                    }
                                    if (types == "sublocality,political" || types == "locality,political" || types == "neighborhood,political" || types == "administrative_area_level_3,political") {
                                        addr.city = (city == '' || types == "locality,political") ? results[0].address_components[ii].long_name : city;
                                    }
                                    if (types == "administrative_area_level_1,political") {
                                        addr.state = results[0].address_components[ii].short_name;
                                    }
                                    if (types == "postal_code" || types == "postal_code_prefix,postal_code") {
                                        addr.zipcode = results[0].address_components[ii].long_name;
                                    }
                                    if (types == "country,political") {
                                        addr.country = results[0].address_components[ii].long_name;
                                    }
                                }
                                addr.success = true;
                                for (name in addr) {
                                    //console.log('### google maps api ### ' + name + ': ' + addr[name] );
                                }
                                //response(addr);
                                //console.log(addr);

                                // Autopopulate city and state
                                if (addr.country == 'United States') {
                                    var state = addr.state;
                                    var city = addr.city;
                                    $('#fields_state').find($('#fields_state').val(state)).attr('selected', 'selected');
                                    $('#fields_city').val(city);
                                    $('.zip-change').addClass('no-error').removeClass('has-error');
                                    if($('#fields_state').val !== '' ){
                                        $('#fields_state').addClass('no-error').removeClass('has-error');
                                    }
                                    if($('#fields_city').val !== '' ){
                                        $('#fields_city').addClass('no-error').removeClass('has-error');
                                    }
                                } else {
                                    //$('#error_handler_overlay1').show();
                                    //$('#error').html($('.zip-change').val() + ' is wrong US zip code');
                                    //alert($('.zip-change').val()+' is wrong zip code');
                                    $('#fields_state').find($('#fields_state').val('')).attr('selected', 'selected');
                                    $('.zip-change').addClass('has-error').removeClass('no-error');
                                    //$('.zip-change').val('');
                                    $('#fields_city').val('');
                                    return false;
                                }


                            } else {
                                //response({success:false});
                                return false;
                            }
                        } else {
                            //response({success:false});
                            return false;
                        }
                    });
                } else {
                    //response({success:false});
                    return false;
                }
            }

            function response(obj) {
                //console.log(obj);
            }

            //console.log(country);