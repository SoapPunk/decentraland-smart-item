import {
    CompiNPC,
    CompiNPCSystem,
    Blockchain,
    CHARACTER,
    NETWORK
} from '@compicactus/dcl-scene-utils'

// import CompiNPC from './_compicactus'
// import CompiNPCSystem from './_compicactus'
// import Blockchain from './_compicactus'
// import CHARACTER from './_compicactus'
// import NETWORK from './_compicactus'

export type Props = {
    ll: 0
}

export default class Button implements IScript<Props> {
    //clip = new AudioClip('sounds/click.mp3')
    network_compi: Blockchain

    init() {
        this.network_compi = new Blockchain(NETWORK.MATIC, CHARACTER.COMPICACTUS)

        // TODO check if already is another system in the scene
        engine.addSystem(new CompiNPCSystem())
    }

    // play(entity: Entity) {
    //     const source = new AudioSource(this.clip)
    //     entity.addComponentOrReplace(source)
    //     source.playing = true
    //
    //     const animator = entity.getComponent(Animator)
    //     const clip = animator.getClip('trigger')
    //     clip.stop()
    //     clip.play()
    // }

    spawn(host: Entity, props: Props, channel: IChannel) {

        let compi = new CompiNPC(-1, this.network_compi)
        compi.setParent(host)


        // const button = new Entity()
        // button.setParent(host)
        //
        // button.addComponent(new GLTFShape('models/Yellow_Fantasy_Button.glb'))
        //
        // const animator = new Animator()
        // const clip = new AnimationState('trigger', { looping: false })
        // animator.addClip(clip)
        // button.addComponent(animator)
        //
        // button.addComponent(
        //     new OnPointerDown(
        //         () => {
        //             const pushAction = channel.createAction('push', {})
        //             channel.sendActions([pushAction])
        //         },
        //         {
        //             button: ActionButton.POINTER,
        //             hoverText: 'Press',
        //             distance: 6,
        //         }
        //     )
        // )
        //
        // channel.handleAction('push', ({ sender }) => {
        //     this.play(button)
        //
        //     if (sender === channel.id) {
        //         channel.sendActions(props.onClick)
        //     }
        // })
    }
}
