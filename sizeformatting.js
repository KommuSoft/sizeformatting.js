var SizeFormatting = (
        function() {

            var Magnitude = [
                {},
                {
                    prefix: 'k'
                },
                {
                    prefix: 'M'
                },
                {
                    prefix: 'G'
                },
                {
                    prefix: 'T'
                },
                {
                    prefix: 'P'
                },
                {
                    prefix: 'E'
                },
                {
                    prefix: 'Z'
                },
                {
                    prefix: 'Y'
                }
            ];

            var Standard = {
                ISO: {
                    factor: 1000
                },
                IEC: {
                    infix: 'i',
                    factor: 1024
                }

            };

            var Unit = {
                Bit: {
                    postfix: 'b',
                    mul: 8
                },
                Byte: {
                    postfix: 'B'
                }
            }

            var my = {}
            my.standard = Standard;
            my.unit = Unit;
            my.format = function(size, standard, unit) {
                var pre = "";
                var mid = "";
                var pst = "";
                var mul = 1;
                var factor = 1;

                standard = standard || Standard.IEC;

                if (standard['prefix']) {
                    pre += standard['prefix'];
                }
                if (standard['infix']) {
                    mid += standard['infix'];
                }
                if (standard['postfix']) {
                    pst += standard['postfix'];
                }
                if (standard['mul']) {
                    mul *= standard['mul'];
                }
                if (standard['factor']) {
                    factor *= standard['factor'];
                }


                unit = unit || Unit.Byte;

                if (unit['prefix']) {
                    pre += unit['prefix'];
                }
                if (unit['infix']) {
                    mid += unit['infix'];
                }
                if (unit['postfix']) {
                    pst += unit['postfix'];
                }
                if (unit['mul']) {
                    mul *= unit['mul'];
                }
                if (unit['factor']) {
                    factor *= unit['factor'];
                }

                size *= mul;

                var mag = Math.min(Math.floor(Math.log(size) / Math.log(factor)), Magnitude.length - 1);

                size /= Math.pow(factor, mag);
                size = size.toFixed(3);

                var magn = Magnitude[mag];
                if (magn['prefix']) {
                    pre += magn['prefix'];
                }
                if (magn['infix']) {
                    mid += magn['infix'];
                }
                if (magn['postfix']) {
                    pst += magn['postfix'];
                }
                return "" + size + " " + pre + mid + pst;

            }
            return my;
        }());
