(function() {
    function test(scene, page, view) {
        /*
         * Demonstrates hit-test functionality.
         * This test may be not fast, as it hit-tests overall about 30000 points against 2 - 20 path elements,
         * and draws points, which are inside a path, and lines to hit-point for points, which are on stroke
         */
        //var page = resetDocumentWithMainPage();
        //page = null;

        var wrapper = document.getElementById(EXApplication.Part.Windows.id);
        page.setProperties(['w'], [1400]);
        var width = 400;
        var height = 400;

        function VertexWidget(container, vertexSource) {
            var viewN = new GXView(scene, container);
            GXViewLayer.call(this, viewN); //, container.lastChild.firstChild);
            this._paintContext.canvas._canvasContext = container.lastChild.firstChild.getContext("2d");
            this._vertexSource = vertexSource;
        }

        GObject.inherit(VertexWidget, GXViewLayer);

        /** override */
        VertexWidget.prototype.paint = function (context) {
            context.canvas.putVertices(this._vertexSource);
            context.canvas.fillVertices(gColor.build(255, 255, 0));
            context.canvas.strokeVertices(gColor.build(0, 0, 0));

            /*
            // Calculate bounds and paint them if any
            var bounds = gVertexInfo.calculateBounds(this._vertexSource, true);
            if (bounds && !bounds.isEmpty()) {
                var boundsVertices = new GXVertexContainer(5);
                boundsVertices.addVertex(GXVertex.Command.Move, bounds.getX(), bounds.getY());
                boundsVertices.addVertex(GXVertex.Command.Line, bounds.getX() + bounds.getWidth(), bounds.getY());
                boundsVertices.addVertex(GXVertex.Command.Line, bounds.getX() + bounds.getWidth(), bounds.getY() + bounds.getHeight());
                boundsVertices.addVertex(GXVertex.Command.Line, bounds.getX(), bounds.getY() + bounds.getHeight());
                boundsVertices.addVertex(GXVertex.Command.Close);
                context.canvas.strokeVertices(boundsVertices, gColor.build(255, 0, 0, 128));
            }
            */
        };

        var vwidth = 200;
        var vheight = 200;

        var x1 = (width - vwidth) / 2;
        var y1 = (width - vheight) / 2;
        var x2 = x1 + vwidth;
        var y2 = y1;
        var x3 = x2;
        var y3 = y2 + vheight;
        var x4 = x1;
        var y4 = y3;
        var cx = x1 + vwidth / 2;
        var cy = y1 + vheight / 2;

        var i, j, k;
        var container;
        var elLeft;
        var elTop;
        var vertexCurve;
        var text;
        var nPt;
        var vertex;
        var xPt;
        var yPt;
        var cnt;
        var hitTestRes;
        var res;


        var baseVertexContainer = new GXVertexContainer();
        baseVertexContainer.addVertex(GXVertex.Command.Move, x1, y1);
        baseVertexContainer.addVertex(GXVertex.Command.Line, x2, y2);
        baseVertexContainer.addVertex(GXVertex.Command.Line, x3, y3);
        baseVertexContainer.addVertex(GXVertex.Command.Line, x4, y4);
        baseVertexContainer.addVertex(GXVertex.Command.Close);

        var halfWidth = width / 2;

        for (i = 0; i < 7; ++i) {
            container = document.createElement("div");
            elLeft = gMath.mod(i, 4) * width + 40;
            elTop = gMath.div(i, 4) * (height + 20) + 40;
            if (i != 3) {
                container.setAttribute("style", "position: absolute; left: " + elLeft.toString() + "px; top: " + elTop.toString() + "px; width: " + width.toString() + "px; border-right: 1px dotted black; border-bottom: 1px dotted black;");
            } else {
                container.setAttribute("style", "position: absolute; left: " + elLeft.toString() + "px; top: " + elTop.toString() + "px; width: " + halfWidth.toString() + "px; border-right: 1px dotted black; border-bottom: 1px dotted black;");
            }
            text = document.createElement("div");
            text.setAttribute("style", "text-align: center; border-bottom: 1px dotted black");
            container.appendChild(text);
            wrapper.appendChild(container);

            var vertexSource = baseVertexContainer;
            switch (i) {
                case 0:
                    text.innerHTML = "Maze";
                    nPt = 49;
                    vertexSource = new GXVertexContainer();
                    vertexSource.addVertex(GXVertex.Command.Move, 40, 190);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 398, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 2, -60);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 398, -60);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 80, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 398, 450);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 80, 450);

//                    vertexSource.addVertex(GXVertex.Command.Move, 80, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 320, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 80, 20);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 320, 20);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 175, 165);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 300, 400);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 150, 230);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 235, 170);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 240, 100);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 230, 290);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 160, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 250, 120);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 150, 120);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 335, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 160, 340);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 335, 340);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 10, 190);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 335, 0);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 50, 0);

                    vertexSource.addVertex(GXVertex.Command.Close);

                    vertexSource.addVertex(GXVertex.Command.Move, 2, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 360, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 40, -20);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 360, -20);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 140, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 360, 390);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 140, 390);

//                    vertexSource.addVertex(GXVertex.Command.Move, 140, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 205, 180);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 220, -65);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 310, 360);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 270, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 190, 170);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 260, 320);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 120, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 270, 50);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 120, 100);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 380, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 120, 400);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 380, 400);

                    vertexSource.addVertex(GXVertex.Command.Curve2, 50, 200);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 380, -40);
                    vertexSource.addVertex(GXVertex.Command.Curve2, 10, -40);

                    vertexSource.addVertex(GXVertex.Command.Close);

                    vertexCurve = new GXVertexContainer();
                    vertexSource.rewindVertices(0);
                    vertex = new GXVertex();
                    for (k=0; k < nPt; ++k) {
                        vertexSource.readVertex(vertex);
                        vertexCurve.addVertex(vertex.command, vertex.x, vertex.y);
                    }

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 2000; ++j) {
                        xPt = Math.random() * width;
                        yPt = Math.random() * height;
//                        xPt = 110;
//                        yPt = 190;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 2, true, hitTestRes);
                        if (res) {
                            cnt = vertexSource.getCount();

                            vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                            if (res && hitTestRes.outline) {
                                vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                            }
                            else {
                                vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                            }
                        }
                    }

                    break;
                case 1:
                    text.innerHTML = "Square";
                    vertexSource = new GXVertexContainer(5);
                    vertexSource.addVertex(GXVertex.Command.Move, x1, y1);
                    vertexSource.addVertex(GXVertex.Command.Line, x2, y2);
                    vertexSource.addVertex(GXVertex.Command.Line, x3, y3);
                    vertexSource.addVertex(GXVertex.Command.Line, x4, y4);
                    vertexSource.addVertex(GXVertex.Command.Line, x1, y1);
                    vertexCurve = new GXVertexContainer(5);
                    vertexCurve.addVertex(GXVertex.Command.Move, x1, y1);
                    vertexCurve.addVertex(GXVertex.Command.Line, x2, y2);
                    vertexCurve.addVertex(GXVertex.Command.Line, x3, y3);
                    vertexCurve.addVertex(GXVertex.Command.Line, x4, y4);
                    vertexCurve.addVertex(GXVertex.Command.Line, x1, y1);

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 1000; ++j) {
                        xPt = Math.random() * width;
                        yPt = Math.random() * height;
                        //xPt = 200;
                        //yPt = 200;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 10, true, hitTestRes);
                        if (res) {
                            cnt = vertexSource.getCount();

                            vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                            if (res && hitTestRes.outline) {
                                vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                            }
                            else {
                                vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                            }
                        }
                    }
                    break;
                case 2:
                    text.innerHTML = "Curve3 Vertex";
                    vertexSource = new GXVertexContainer(5);
                    vertexSource.addVertex(GXVertex.Command.Move, x1, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x2, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x4, y4);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x3, y3);
                    vertexSource.addVertex(GXVertex.Command.Close);
                    vertexCurve = new GXVertexContainer(5);
                    vertexCurve.addVertex(GXVertex.Command.Move, x2, y2);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x1, y1);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x3, y3);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x4, y4);
                    vertexCurve.addVertex(GXVertex.Command.Close);

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 1000; ++j) {
                        xPt = Math.random() * width;
                        yPt = Math.random() * height;
                        //xPt = 200;
                        //yPt = 200;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 10, true, hitTestRes);
                        if (res) {
                            cnt = vertexSource.getCount();

                            vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                            if (res && hitTestRes.outline) {
                                vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                            }
                            else {
                                vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                            }
                        }
                    }
                    break;
                case 3:
                    text.innerHTML = "Curve3 Vertex";
                    vertexSource = new GXVertexContainer(5);
                    vertexSource.addVertex(GXVertex.Command.Move, x2 + 20 - halfWidth, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x2 - halfWidth, y2 / 2);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x4 - halfWidth, y4);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x3 - halfWidth, y3);
                    vertexSource.addVertex(GXVertex.Command.Close);
                    vertexCurve = new GXVertexContainer(5);
                    vertexCurve.addVertex(GXVertex.Command.Move, x2 + 20 - halfWidth, y1);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x2 - halfWidth, y2 / 2);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x4 - halfWidth, y4);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x3 - halfWidth, y3);
                    vertexCurve.addVertex(GXVertex.Command.Close);

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 10000; ++j) {
                        xPt = Math.random() * halfWidth;
                        yPt = Math.random() * height;
//                        xPt = 260;
//                        yPt = 150;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 10, true, hitTestRes);
                        if (res) {
                        cnt = vertexSource.getCount();

                        vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                        if (res && hitTestRes.outline) {
                            vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                        }
                        else {
                            vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                        }
                        }
                    }
                    break;
                case 4:
                    text.innerHTML = "Curve3 Vertex";
                    vertexSource = new GXVertexContainer(5);
                    vertexSource.addVertex(GXVertex.Command.Move, x2, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x1, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x4, y4);
                    vertexSource.addVertex(GXVertex.Command.Curve2, x3, y3);
                    vertexSource.addVertex(GXVertex.Command.Close);
                    vertexCurve = new GXVertexContainer(5);
                    vertexCurve.addVertex(GXVertex.Command.Move, x2, y1);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x1, y1);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x4, y4);
                    vertexCurve.addVertex(GXVertex.Command.Curve2, x3, y3);
                    vertexCurve.addVertex(GXVertex.Command.Close);

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 1000; ++j) {
                        xPt = Math.random() * width;
                        yPt = Math.random() * height;
//                        xPt = 253;
//                        yPt = 143;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 40, true, hitTestRes);
                        if (res) {
                            cnt = vertexSource.getCount();

                            vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                            if (res && hitTestRes.outline) {
                                vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                            }
                            else {
                                vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                            }
                        }
                    }
                    break;
                case 5:
                    text.innerHTML = "Curve Vertex";
                    vertexSource = new GXVertexContainer(4);
                    vertexSource.addVertex(GXVertex.Command.Move, x1 + 40, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve, cx, cy);
                    vertexSource.addVertex(GXVertex.Command.Curve, x3, y3);
                    vertexSource.addVertex(GXVertex.Command.Close);
                    vertexCurve = new GXVertexContainer(4);
                    vertexCurve.addVertex(GXVertex.Command.Move,  x1 + 40, y1);
                    vertexCurve.addVertex(GXVertex.Command.Curve, cx, cy);
                    vertexCurve.addVertex(GXVertex.Command.Curve, x3, y3);
                    vertexCurve.addVertex(GXVertex.Command.Close);

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 10000; ++j) {
                        xPt = Math.random() * width;
                        yPt = Math.random() * height;
                        //xPt = cx+5;
                        //yPt = cy;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 10, true, hitTestRes);
                        if (res) {
                            cnt = vertexSource.getCount();

                            vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                            if (res && hitTestRes.outline) {
                                vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                            }
                            else {
                                vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                            }
                        }
                    }
                    break;
                case 6:
                    text.innerHTML = "Curve Vertex";
                    vertexSource = new GXVertexContainer(4);
                    vertexSource.addVertex(GXVertex.Command.Move, x1, y1);
                    vertexSource.addVertex(GXVertex.Command.Curve, x4, y4);
                    vertexSource.addVertex(GXVertex.Command.Curve, x2, cy);
                    vertexSource.addVertex(GXVertex.Command.Close);
                    vertexCurve = new GXVertexContainer(4);
                    vertexCurve.addVertex(GXVertex.Command.Move, x1, y1);
                    vertexCurve.addVertex(GXVertex.Command.Curve, x4, y4);
                    vertexCurve.addVertex(GXVertex.Command.Curve, x2, cy);
                    vertexCurve.addVertex(GXVertex.Command.Close);

                    hitTestRes = new GXVertexInfo.HitResult();

                    for (j=0; j < 1000; ++j) {
                        xPt = Math.random() * width;
                        yPt = Math.random() * height;
                        //xPt = 250;
                        //yPt = 200;
                        res = gVertexInfo.hitTest(xPt, yPt, vertexCurve, 40, true, hitTestRes);
                        if (res) {
                            cnt = vertexSource.getCount();

                            vertexSource.addVertex(GXVertex.Command.Move, xPt, yPt);
                            if (res && hitTestRes.outline) {
                                vertexSource.addVertex(GXVertex.Command.Line, hitTestRes.x, hitTestRes.y);
                            }
                            else {
                                vertexSource.addVertex(GXVertex.Command.Line, xPt, yPt+1);
                            }
                        }
                    }
                    break;
            }

            var widget = new VertexWidget(container, vertexSource);
            widget.resize(width, height);
            widget.paint(widget._paintContext);
        }
    }

    gDevelopment.tests.push({
        title: 'Path Inside Test',
        category: 'Path',
        test: test
    });
})();