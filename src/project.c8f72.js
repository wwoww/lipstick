window.__require=function e(t,c,o){function n(r,s){if(!c[r]){if(!t[r]){var a=r.split("/");if(a=a[a.length-1],!t[a]){var l="function"==typeof __require&&__require;if(!s&&l)return l(a,!0);if(i)return i(a,!0);throw new Error("Cannot find module '"+r+"'")}}var u=c[r]={exports:{}};t[r][0].call(u.exports,function(e){return n(t[r][1][e]||e)},u,u.exports,e,t,c,o)}return c[r].exports}for(var i="function"==typeof __require&&__require,r=0;r<o.length;r++)n(o[r]);return n}({DataMgr:[function(e,t,c){"use strict";cc._RF.push(t,"8b2af/B/WRKOrPyQp5sKqzj","DataMgr"),Object.defineProperty(c,"__esModule",{value:!0});c.default={reset:function(){this.currentLevel=1,this.leftLipstick=0,this.hitLipstick=0},currentLevel:1,leftLipstick:0,hitLipstick:0,levelInfo:[{level:1,totalLipstick:5,time:30},{level:2,totalLipstick:6,time:20},{level:3,totalLipstick:7,time:10}]},t.exports=c.default,cc._RF.pop()},{}],Game:[function(e,t,c){"use strict";cc._RF.push(t,"53deazEL+VKHY4Cw0/+hZuV","Game");var o=e("DataMgr"),n=e("LayerMgr");cc.Class({extends:cc.Component,properties:{nodePlate:cc.Node,nodeTouch:cc.Node,nodeLipstick:cc.Node,prefabLipstick:cc.Prefab,nodeLipstickContainer:cc.Node},onLoad:function(){cc.director.getCollisionManager().enabled=!0},start:function(){var e=this;this.nodeTouch.getComponent("Touch").setCallback(function(){e.onTouchCallback()}),this.reloadUI(),this.startRun()},startRun:function(){this.nodePlate.stopAllActions(),this.nodePlate.rotation=0;var e=cc.sequence(cc.rotateBy(4,360).easing(cc.easeIn(1.5)),cc.rotateBy(4,-360).easing(cc.easeIn(1.5)));this.nodePlate.runAction(e.repeatForever())},onTouchCallback:function(){var e=this;if(!(o.leftLipstick<=0)&&this.nodeLipstick.active){var t=cc.instantiate(this.prefabLipstick);t.x=this.nodeLipstick.x,t.y=this.nodeLipstick.y,t.parent=this.nodeLipstick.parent,t.runAction(cc.moveTo(.5,0,this.nodePlate.y)),t.getComponent("Lipstick").setCallback({success:function(){e.onSuccessCallback()},fail:function(){e.onFailCallback()}}),o.leftLipstick--,this.nodeLipstickContainer.getComponent("LipstickContainer").reload(o.leftLipstick,o.levelInfo[o.currentLevel-1].totalLipstick),o.leftLipstick<=0?this.nodeLipstick.active=!1:this.nodeLipstick.runAction(cc.sequence(cc.hide(),cc.delayTime(.2),cc.show()))}},reloadUI:function(){var e=o.levelInfo[o.currentLevel-1];n.showLevelStart(e.level),this.nodeLipstickContainer.getComponent("LipstickContainer").reload(e.totalLipstick,e.totalLipstick),o.leftLipstick=e.totalLipstick,o.hitLipstick=0,this.nodePlate.getComponent("Plate").removeAllLipstick(),this.nodeLipstick.active=e.totalLipstick>0},onSuccessCallback:function(){var e=this;o.hitLipstick++,o.hitLipstick==o.levelInfo[o.currentLevel-1].totalLipstick&&(o.currentLevel==o.levelInfo[o.levelInfo.length-1].level?(n.showReward(1),o.reset()):(o.currentLevel++,this.node.runAction(cc.sequence(cc.callFunc(function(){n.showLevelEnd(!0)}),cc.delayTime(1),cc.callFunc(function(){e.reloadUI()})))))},onFailCallback:function(){n.showLevelEnd(!1),o.reset()}}),cc._RF.pop()},{DataMgr:"DataMgr",LayerMgr:"LayerMgr"}],Home:[function(e,t,c){"use strict";cc._RF.push(t,"9d19345gP5HNbbiGaMDWls7","Home");e("LayerMgr"),e("DataMgr");cc.Class({extends:cc.Component,properties:{},start:function(){},onClick:function(e,t){switch(t){case"start":cc.director.loadScene("game")}}}),cc._RF.pop()},{DataMgr:"DataMgr",LayerMgr:"LayerMgr"}],LayerMgr:[function(e,t,c){"use strict";cc._RF.push(t,"29ad3ouyepAab2eTVSWTNUX","LayerMgr"),Object.defineProperty(c,"__esModule",{value:!0});var o={showLevelStart:function(e){null==cc.director.getScene().getChildByName("level_start")&&cc.loader.loadRes("remote/prefab/levelStart",function(t,c){if(t)cc.error("remote/prefab/levelStart",t);else{var o=cc.instantiate(c);o.parent=cc.director.getScene(),o.name="level_start",o.getComponent("LevelStart").startShow(e)}})},showLevelEnd:function(e,t,c){null==cc.director.getScene().getChildByName("level_end")&&cc.loader.loadRes("remote/prefab/levelEnd",function(o,n){if(o)cc.error("remote/prefab/levelEnd",o);else{var i=cc.instantiate(n);i.parent=cc.director.getScene(),i.name="level_end",i.getComponent("LevelEnd").startShow(e,t,c)}})},showReward:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;null==cc.director.getScene().getChildByName("reward")&&cc.loader.loadRes("remote/prefab/reward",function(t,c){if(t)cc.error("remote/prefab/reward",t);else{var o=cc.instantiate(c);o.parent=cc.director.getScene(),o.name="reward",o.getComponent("Reward").startShow(e)}})},showRule:function(){null==cc.director.getScene().getChildByName("rule")&&cc.loader.loadRes("remote/prefab/rule",function(e,t){if(e)cc.error("remote/prefab/rule",e);else{var c=cc.instantiate(t);c.parent=cc.director.getScene(),c.name="rule"}})},showRecord:function(){null==cc.director.getScene().getChildByName("record")&&cc.loader.loadRes("remote/prefab/record",function(e,t){if(e)cc.error("remote/prefab/record",e);else{var c=cc.instantiate(t);c.parent=cc.director.getScene(),c.name="record"}})},showMsgBox:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;null==cc.director.getScene().getChildByName("msgbox")&&cc.loader.loadRes("remote/prefab/msgBox",function(t,c){if(t)cc.error("remote/prefab/msgBox",t);else{var o=cc.instantiate(c);o.parent=cc.director.getScene(),o.name="msgbox",o.getComponent("MsgBox").startShow(e)}})}};c.default=o,t.exports=c.default,cc._RF.pop()},{}],LevelEnd:[function(e,t,c){"use strict";cc._RF.push(t,"2a8d4CDgDlNFIfcaZuS6YSU","LevelEnd"),cc.Class({extends:cc.Component,properties:{nodeSuccess:cc.Node,nodeFail:cc.Node},start:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(e){e.stopPropagation()})},startShow:function(e){e?(this.nodeSuccess.active=!0,this.nodeFail.active=!1,this.node.runAction(cc.sequence(cc.delayTime(1.1),cc.removeSelf()))):(this.nodeSuccess.active=!1,this.nodeFail.active=!0)},onClick:function(e,t){switch(t){case"home":cc.director.loadScene("home")}}}),cc._RF.pop()},{}],LevelStart:[function(e,t,c){"use strict";cc._RF.push(t,"480baAU3JVNWoFrrkkGou6r","LevelStart"),cc.Class({extends:cc.Component,properties:{txtLevel:cc.Label},start:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(e){e.stopPropagation()})},startShow:function(e){this.txtLevel.string=e,this.node.runAction(cc.sequence(cc.delayTime(1),cc.removeSelf()))}}),cc._RF.pop()},{}],LipstickContainer:[function(e,t,c){"use strict";cc._RF.push(t,"f56ech3RGxDTpCoPXeW5laU","LipstickContainer"),cc.Class({extends:cc.Component,properties:{spfLipstickIn:cc.SpriteFrame},onLoad:function(){this._leftCount=0,this._totalCount=0},start:function(){},reload:function(e,t){if(!(e<0||t<=0||e>t)){this._leftCount=e,this._totalCount=t,this.node.removeAllChildren();for(var c=0;c<e;){var o=this.getSpriteBySpriteFrame(this.spfLipstickIn);this.node.addChild(o),c++}}},getSpriteBySpriteFrame:function(e){var t=new cc.Node,c=t.addComponent(cc.Sprite);return c.spriteFrame=e,c.sizeMode=cc.Sprite.SizeMode.RAW,c.type=cc.Sprite.Type.SIMPLE,c.trim=!1,t},getLeftCount:function(){return this._leftCount},getTotalCount:function(){return this._totalCount}}),cc._RF.pop()},{}],Lipstick:[function(e,t,c){"use strict";cc._RF.push(t,"08f008UVuZCGJFSrXgeOpbb","Lipstick"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._SuccessCallback=null,this._FailCallback=null},start:function(){},onCollisionEnter:function(e,t){if("hold"==e.node.group){this.node.stopAllActions();var c=cc.sequence(cc.repeat(cc.spawn(cc.rotateBy(.1,90),cc.moveBy(.1,100,-100)),10),cc.removeSelf());this.node.runAction(c),null!=this._FailCallback&&this._FailCallback()}else"plate"==e.node.group&&null!=this._SuccessCallback&&this._SuccessCallback()},onCollisionStay:function(e,t){},onCollisionExit:function(e,t){},setCallback:function(e){this._SuccessCallback=e.success,this._FailCallback=e.fail}}),cc._RF.pop()},{}],LoadLogic:[function(e,t,c){"use strict";cc._RF.push(t,"6431349dfJKkqvG4ePYuUUh","LoadLogic"),cc.Class({extends:cc.Component,properties:{progressBar:{default:null,type:cc.ProgressBar,tooltip:"\u52a0\u8f7d\u8fdb\u5ea6"},labelProgress:{default:null,type:cc.Label,tooltip:"\u52a0\u8f7d\u8fdb\u5ea6"},_progress:{default:0,visible:!1,tooltip:"\u8fdb\u5ea6"},_isLoading:{default:!1,tooltip:"\u662f\u5426\u6b63\u5728\u52a0\u8f7d"}},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(e){e.stopPropagation()})},start:function(){this.startPreload()},update:function(e){this._isLoading&&this.setProgress()},setProgress:function(){this.labelProgress.string=Math.floor(100*this._progress)+"%",this.progressBar.progress=this._progress},startPreload:function(){var e=this;this._isLoading=!0,cc.loader.loadResDir("remote",function(t,c,o){e._isLoading&&(e._progress=1*t/c)},function(t,c){e._progress=1,e.onLoadComplete()})},onLoadComplete:function(){this.setProgress(),this._isLoading=!1,cc.director.loadScene("home")},onDisable:function(){}}),cc._RF.pop()},{}],Plate:[function(e,t,c){"use strict";cc._RF.push(t,"73c72eDE/JF15e6V82Wm7sS","Plate"),cc.Class({extends:cc.Component,properties:{nodeLipStick:cc.Node},onLoad:function(){this.RADIUS=this.node.getComponent(cc.CircleCollider).radius,this._lipstick=[]},start:function(){},onCollisionEnter:function(e,t){"fire"==e.node.group&&(e.node.removeFromParent(),this.addLipstickByDegrees(180-this.node.rotation),this.node.runAction(cc.sequence(cc.moveBy(.05,0,15),cc.moveBy(.05,0,-15))))},onCollisionStay:function(e,t){},onCollisionExit:function(e,t){},addLipstickByDegrees:function(e){var t=cc.misc.degreesToRadians(e),c=cc.instantiate(this.nodeLipStick);c.x=this.RADIUS*Math.sin(t),c.y=this.RADIUS*Math.cos(t),c.rotation=e,c.active=!0,c.parent=this.node,this._lipstick.push(c)},removeAllLipstick:function(){null!=this._lipstick&&(this._lipstick.forEach(function(e){e.removeFromParent()}),this._lipstick=[])}}),cc._RF.pop()},{}],Reward:[function(e,t,c){"use strict";cc._RF.push(t,"75730IZwuRONJNqFxJlc7Nw","Reward"),cc.Class({extends:cc.Component,properties:{},start:function(){this.node.on(cc.Node.EventType.TOUCH_START,function(e){e.stopPropagation()})},startShow:function(){},onClick:function(e,t){switch(t){case"sure":cc.director.loadScene("home")}}}),cc._RF.pop()},{}],Touch:[function(e,t,c){"use strict";cc._RF.push(t,"ac61eUxw3NOHqg5jXVqUkz+","Touch"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._onTouchCallback=null},start:function(){var e=this;this.node.on(cc.Node.EventType.TOUCH_START,function(t){null!=e._onTouchCallback&&e._onTouchCallback()})},setCallback:function(e){this._onTouchCallback=e}}),cc._RF.pop()},{}],"use_v2.0.x_cc.Toggle_event":[function(e,t,c){"use strict";cc._RF.push(t,"7fa02xK4KBEsbelQMseZlkd","use_v2.0.x_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_check=!0),cc._RF.pop()},{}]},{},["use_v2.0.x_cc.Toggle_event","DataMgr","LayerMgr","Touch","Game","Home","LevelEnd","LevelStart","Lipstick","LipstickContainer","LoadLogic","Plate","Reward"]);