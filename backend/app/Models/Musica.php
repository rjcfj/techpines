<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Musica extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'titulo',
        'visualizacoes',
        'youtube_id',
        'thumb',
    ];

    public function getVisualizacoesFormatadasAttribute()
    {
        $numero = $this->visualizacoes;

        if ($numero >= 1000000000) {
            return number_format($numero / 1000000000, 1) . 'B';
        }
        if ($numero >= 1000000) {
            return number_format($numero / 1000000, 1) . 'M';
        }
        if ($numero >= 1000) {
            return number_format($numero / 1000, 1) . 'K';
        }
        return $numero;
    }
}
