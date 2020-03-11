import React from 'react';
import "./ImgAvatar.css";

const options = [
    { value: 'a', label: 'Sad' },
    { value: 'ab', label: 'Afro' },
    { value: 'abc', label: 'Asian' },
    { value: 'abcd', label: 'Red' },
    { value: 'abcde', label: 'No-Hair' },
    { value: 'abcdef', label: 'Ninja' },
    { value: 'abcdefg', label: 'Sunglasses' },
    { value: 'abcdefgh', label: 'HatMan' }
];

var avatarSelected = undefined;

const ImgAvatar = ({avatar, handleChangeAvatar}) => {

    let handleAvatarEvent = (event) => {
        let image = event.target;

        if(avatarSelected === undefined || image.getAttribute('id') !== avatarSelected.getAttribute('id')) {
            image.className = 'avatar-form-selected';

            if (avatarSelected !== undefined) {
                avatarSelected.className = 'avatar-form';
            }

            avatarSelected = image;

            handleChangeAvatar(image.getAttribute('data-value'));
        }
    };

    return (
        <div style={{marginBottom: 10}}>
            {options.map((opt) =>
                    (
                            <img
                                key={'avatar' + opt.value}
                                onClick={handleAvatarEvent}
                                id={'avatar' + opt.value}
                                className={(avatar === opt.value) ? 'avatar-form-selected' : 'avatar-form'}
                                data-value={opt.value}
                                src = {'/media/' + opt.value + '.png'}
                                alt = {opt.label}
                                title = {opt.label}
                                weight = "50"
                                width = "50">
                            </img>
                    )
            )}
        </div>
    );
}

export default ImgAvatar;