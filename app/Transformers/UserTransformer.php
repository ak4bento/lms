<?php

namespace App\Transformers;

use App\User;
use League\Fractal\TransformerAbstract;

use App\Transformers\CategoryTransformer;

class UserTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'category',
    ];
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform( User $user )
    {
        $baseFields = [
            'name' => $user->name,
            'username' => $user->username,
            'initials' => $user->initials,
            'avatar' => strlen( $user->getFirstMediaUrl( 'avatar' ) ) > 0 ? 
                url( $user->getFirstMediaUrl( 'avatar' ) ) : '',
            'email' => $user->email ,
            'detail' => $user->detail
        ];

        // if ( $user == auth()->user() )
        //     return array_merge( $baseFields, [
        //         'email' => $user->email,
        //     ] );

        return $baseFields;
    }

    public function includeCategory( User $user )
    {
        return $user->categorizable ?
            $this->item($user->categorizable->category, new CategoryTransformer ) : null;
    }

}
